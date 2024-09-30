import { productModel } from "./models/product.model.js";

export class ProductsDao {
    static async get() {
        return await productModel.find().lean();  
    }
    
    static async create(data) {
        return await productModel.create(data);
    }
    
    static async getBy(filtro={}) {
        return await productModel.findById(filtro);  // Usa findById para buscar por ID
    }
    
     static async update(id,data){
        return await productModel.findByIdAndUpdate(id,data)
    } 
    static async delete(id) {
        return await productModel.findByIdAndDelete(id);  // Usa findByIdAndDelete
    }

}
