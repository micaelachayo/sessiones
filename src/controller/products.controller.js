
import { cartService } from "../service/Cart.services.js";
import { productsService } from "../service/Products.service.js";
import { error500 } from "../utils.js";


export const createProduct= async(req,res)=>{

    try {
        const { title, description, code, price, stock, category } = req.body;
        let newProduct = await productsService.createProduct({
            title,description,code,price,stock,category
        })
        return res.status(201).json(newProduct);
    } catch (error) {
         return error500(res,error)
        
    }
}

export const getProduct=async(req,res)=>{
    try {
        let productos= await productsService.getProducts()
        console.log(productos)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json(productos);
    } catch (error) {
        
    }

}
export const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        let product=await productsService.deleteProduct(id)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({messasge:'Producto Elminado'});
    } catch (error) {
        
    }
}