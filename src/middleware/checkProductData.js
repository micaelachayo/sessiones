import { productsService } from "../service/Products.service.js";
import { error500 } from "../utils.js";


export const checkProductData = async (req, res, next) => {
  try {
    const body = req.body;
    const { title, description, price, code, stock, category } =body;
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };
    //generamos un array con todos los valores de arriba y si incluye un undifined que me tire error.
    if (Object.values(newProduct).includes(undefined)) {
      return res.status(400).json({ status: "error", msg: "Todos los campos son obligatorios" });
    }
    const response = await productsService.getProducts();
     const products= response.products || []; 
    // Verificar que el código sea único
    const codeExists = products.some((p) => p.code === code);
    if (codeExists) {
      return res
        .status(400)
        .json({ status: "error", msg: "El código debe ser único" });
    }
    // Next permite que continué la ejecución del endpoint
    next();
  } catch (error) {
res.setHeader('Content-Type','application/json');
return res.status(500).json(
  {
    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
    detalle:`${error.message}`
  }
)

}}
