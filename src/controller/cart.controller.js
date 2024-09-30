
import { ticketModel } from "../dao/models/ticket.model.js"
import { cartService } from "../service/Cart.services.js"
import { productsService } from "../service/Products.service.js"

import { error500 } from "../utils.js"
import mongoose, { isValidObjectId } from "mongoose"
import {v4 as UUID} from 'uuid'
import { ticketService } from "../service/Ticket.services.js"


export const creatCart=async(req,res)=>{
    try {
        let newCart= await cartService.createCart()
        console.log(newCart)
        res.setHeader('Content-Type','application/json');
        return res.status(201).json(newCart);
    } catch (error) {
        return error500(res,error)
    }
}


export const addProductToCart = async (req, res) => {
    try {
      let { cid, pid } = req.params;
  
      const productInCart = await cartService.findUpdate(
        cid, 
        pid, 
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );
  
      if (!productInCart) {
        // Si el producto no está en el carrito, lo agregas
        await cartService.updateCart(cid, { $push: { products: { product: pid, quantity: 1 } } });
      }
  
      // Devuelves el carrito actualizado sin hacer otra actualización
      const updatedCart = await cartService.getCartById(cid); // Aquí traes el carrito actualizado sin necesidad de volver a actualizarlo
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ cart: updatedCart });
    } catch (error) {
      return error500(res, error);
    }
  };
  
  export const getCartById =async(req,res)=>{
    try { 
      let {cid}=req.params
      if (!isValidObjectId(cid)){
  res.setHeader('Content-Type','application/json');
  return res.status(400).json({error:`ingrese el id en el formato correcto`})
      }
      let cart=await cartService.getCartById(cid)
      if(!cart){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe cartt ${cid}`})
      }
      res.setHeader('Content-Type','application/json');
      return res.status(200).json({cart});
    } catch (error) {
      return error500(res,error)
    }
  }

  //comprar carrito  
  export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const userEmail = req.user.email; // Obtener el email del usuario

        const ticket = await ticketService.purchaseCart(cid, userEmail);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ ticket });
    } catch (error) {
     error500(res, error)
    }
};

// export const purchaseCart=async(req, res)=>{
//   try {
//     let { cid } = req.params;
//     if (!isValidObjectId(cid)) {
//         return res.status(400).json({ error: `Ingrese id en formato válido` });
//     }

//     let cart = await cartService.getCartById(cid);
//     if (!cart) {
//         return res.status(400).json({ error: `No existe cart ${cid}` });
//     }
//       // if(!isValidObjectId(cid)){
//       //     res.setHeader('Content-Type','application/json');
//       //     return res.status(400).json({error:`Ingrese id en formato válido`})
//       // }
  
 
//       // if(!cart){
//       //     res.setHeader('Content-Type','application/json');
//       //     return res.status(400).json({error:`No existe cart ${cid}`})
//       // }

//       // recorrer el products del cart, y ver si cada producto existe en DB
//       // además ver si hay stock, y actualizar el stock (descuento la quantity que compro). 
//       // Mientras, marco que item de product tiene stock y cual no
//       // cart.products.forEach
//       for(let i=0; i<cart.products.length; i++){  // .forEach no labura bien con async/await, no arroja error, pero no respeta el await...!!! usar for
//           let p=cart.products[i]
//           // console.log(p)
//           let producto=await productsService.getProductById(p.product._id)
//           if (!producto) {
//             console.log(`Producto con ID ${p.product._id} no encontrado`);
//             continue; // Saltar este producto si no se encuentra en la base de datos
//           }
//           if(producto && producto.stock>=p.quantity){
//               p.tieneStock=true
//               // actualizar el inventario del producto
//               producto.stock=producto.stock-p.quantity
//               await productsService.updateProduct(p.product.id, producto)
//           }
//       }


//       // separo lo que tiene stock (para generar ticket)
//       const conStock=cart.products.filter(p=>p.tieneStock===true)
//       // borro lo que tiene stock de cart.products (queda lo que no tenía stock)
//       cart.products=cart.products.filter(p=>p.tieneStock===undefined)

//       // si no tengo items con stock, devuelvo error...!!!
//       if(conStock.length==0){
//           res.setHeader('Content-Type','application/json');
//           return res.status(400).json({error:`No hay ítems en condiciones de ser comprados...!!!`})
//       }

//       // con lo que separe (que tiene stock), calculo total, y grabo el ticket
//       let total=conStock.reduce((acum, item) => acum + (item.quantity * item.product.price), 0);
//       let nroComp=Date.now()
//       let fecha=new Date()
//       let email_comprador=req.user.email
//       console.log(nroComp, fecha, email_comprador, total)
//       const ticket=await ticketModel.create({
//         code: UUID(), // o cualquier otra lógica para generar un código único
//         purchase_datetime: fecha,
//         amount: total,
//         purchaser: email_comprador,
//         detalle: conStock
//       })

//       // actualizar cart... como quede (con algún ítem sin stock o vacío)
//       await cartService.updateCart(cid, cart)

//       let errorMail=undefined
//       // enviar email (con un try catch independiente... por si falla el envío de mail, 
//       // hacer el tratamiento aparte)
//       // en el catch completan la descrip del error en errorMail

//       res.setHeader('Content-Type','application/json');
//       return res.status(200).json({ticket, errorMail});
//   } catch (error) {
//       error500(res, error)
//   }
// }