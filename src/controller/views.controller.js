import { productModel } from "../dao/models/product.model.js";

export const loginView = (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};

export const registroView = (req, res) => {
  try {
    res.status(200).render("registro");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
export const home = (req, res) => {
  try {
    res.status(200).render("home");
  } catch (error) {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
      detalle: `${error.message}`,
    });
  }
};
export const perfil= async(req, res) => {

  const products = await productModel.find({}); // Obtén los productos de la base de datos
  const clonedProducts = products.map(product => ({
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    thumbnail: product.thumbnail,
  }));

  
  res.status(200).render('current', { 
    usuario: req.user, 
    products: clonedProducts  // Pasa también los productos a la vista
  })}