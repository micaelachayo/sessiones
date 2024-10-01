import { TicketDao as DAO } from "../dao/Ticket.dao.js";
import { cartService } from "./Cart.services.js";
import { mailService } from "./Mail.service.js";
import { productsService } from "./Products.service.js";
import { v4 as UUID } from "uuid";

class TicketService {
  constructor(dao) {
    this.dao = dao;
  }

  async purchaseCart(cid, userEmail) {
    const cart = await cartService.getCartById(cid);
    const conStock = []; // Array para productos disponibles
    const noProcesados = []; // Array para productos que no se pudieron procesar

    for (let i = 0; i < cart.products.length; i++) {
      let p = cart.products[i];
      let producto = await productsService.getProductById(p.product._id);

      if (!producto) {
        console.log(`Producto con ID ${p.product._id} no encontrado`);
        noProcesados.push(p.product._id+` (${p.product.title})`); // Agregar ID a productos no procesados
        continue; // Saltar este producto si no se encuentra
      }

      if (producto.stock >= p.quantity) {
        // Verificamos si hay suficiente stock
        producto.stock -= p.quantity; // Reducir el stock del producto
        await productsService.updateProduct(p.product._id, producto);
        conStock.push({
          product: {
            _id: producto._id,
            title: producto.title,
            price: producto.price,
          },
          quantity: p.quantity,
          total: p.quantity * producto.price, // Calcular el total por producto
        });
      } else {
        console.log(
          `No hay suficiente stock para el producto ${producto.title}. Se necesita ${p.quantity}, pero solo hay ${producto.stock}.`
        );
        noProcesados.push(p.product._id+ ` (${p.product.title})`); // Agregar ID a productos no procesados
      }
    }

    // Verificamos que haya productos en stock para crear el ticket
    if (conStock.length === 0) {
      throw new Error(`No hay ítems en condiciones de ser comprados...!!!`);
    }

    // Calcular total de la compra
    let total = conStock.reduce((acum, item) => acum + item.total, 0);
    let fecha = new Date();

    // Crear el ticket
    const ticket = await this.dao.create({
      code: UUID(), // Generar un código único
      purchase_datetime: fecha,
      amount: total,
      purchaser: userEmail,
      detail: conStock,
    });

    // Filtrar los productos que no se pudieron comprar
    cart.products = cart.products.filter((p) =>
      noProcesados.includes(p.product._id+` (${p.product.title})`)
    ); // Mantener solo los que no se compraron

    // Actualizar el carrito con los productos no procesados
    await cartService.updateCart(cid, cart);

    await mailService.sendEmail(userEmail, ticket);
    // Devolver el ticket y los productos no procesados
    return { ticket, noProcesados }; // Devolver el ticket y el arreglo de productos no procesados
  }
}
export const ticketService = new TicketService(DAO);
