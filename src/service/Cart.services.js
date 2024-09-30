import { CartDao } from "../dao/cart.dao.js"


class CartServices{
    constructor(dao){
        this.dao=dao
    }
    async createCart(){
        return this.dao.create()
    }
    async getCartById (id){
        return this.dao.getBy({_id:id})
    }
    //el updatecart me sirve para ir aniadiendo productos al carrito
    async updateCart (id,cart){
     return this.dao.update({_id:id}, cart)
    }
    //que busque algo y actualizar
    async findUpdate(cid, pid, cart) {
        return this.dao.findAndUpdate(
          { _id: cid, "products.product": pid }, 
          cart
        );
      }
      
}
export const cartService= new CartServices(CartDao)