
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
