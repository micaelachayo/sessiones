import { cartsModel } from "./models/cart.model.js";

export class CartDao{
    static async create(){
        //como el cart model tiene un objeto con arrays de producttos pongo {products:[]}
        return await cartsModel.create({products:[]})
    }
    static async getBy(filtro={}){ //osea q si no llega filtro que sea un objeto vacio
        return await cartsModel.findOne(filtro).populate("products.product") //products es el q hice referencia en model
    }
    //que agregue 
    static async update(filtro={}, cart){
        return await cartsModel.updateOne(filtro, cart)
    } 
    //que busque algo y agregue
   static async findAndUpdate (find={},updateCart){
    return await cartsModel.findOneAndUpdate(find, updateCart)
   }
}
