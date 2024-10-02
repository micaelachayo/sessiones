import { UsuarioDao as DAO} from "../dao/Usuario.dao.js"



 class UsuarioService{
    constructor(dao){
        this.dao=dao
    }
    async getUserByEmail(email){
return await this.dao.existeUsuario({email})
    }
    async getUserById(id){
        return await this.dao.existeUsuario({_id:id})
            }
    async create(data){
        return await this.dao.createUsuario(data)
    }
  

 }

 export const usuarioService= new UsuarioService(DAO)