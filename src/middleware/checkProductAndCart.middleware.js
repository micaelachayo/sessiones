import { cartService } from "../service/Cart.services.js";
import { productsService } from "../service/Products.service.js";




export const checkProductAndCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    // Verificar si el producto existe
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(400).json({ status: "error", msg: "Producto no encontrado" });
    }

    // Verificar si el carrito existe
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(400).json({ status: "error", msg: "El ID del carrito no se ha encontrado" });
    }

    next();
  } catch (error) {
    console.error("Error en el middleware:", error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
};
