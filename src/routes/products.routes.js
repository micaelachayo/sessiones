import { Router } from "express";
import {
  createProduct,
  getProduct,
} from "../controller/products.controller.js";
import { checkProductData } from "../middleware/checkProductData.js";
import { passportCall } from "../utils.js";
import { verificarRol } from "../middleware/roleVerify.js";

export const router = Router();

router.post(
  "/",
  passportCall("current"), // Asegura que el usuario esté autenticado
  verificarRol(["admin"]), // Verifica que tenga rol de administrador,
  checkProductData,
  createProduct
);

router.get("/products", getProduct);
