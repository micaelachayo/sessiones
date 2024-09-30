import { ProductsDao as DAO} from "../dao/Products.dao.js";

class ProductsService {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts() {
        return await this.dao.find();
        
    }

    async createProduct(data) {
        return await this.dao.create(data);  
    }

    async getProductById(id) {
        return await this.dao.getBy({_id:id});
    }
    async getProductByTitle(title) {
        return await this.dao.getBy({title});
    }
    async deleteProduct(id) {
        return await this.dao.delete({_id:id});
    }
    async updateProduct(id, product){
        return await this.dao.update({_id:id}, product);
    }
}

export const productsService = new ProductsService(DAO);
