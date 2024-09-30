import { usuarioModelo } from "./models/usuario.models.js";

export class UsuarioDao{
  static async getUsuario(){
    return await usuarioModelo.find()
  }

static async createUsuario(id){
  const indentificacion = await usuarioModelo.create(id);
   return indentificacion;
}

static async existeUsuario(filtro){
  return await usuarioModelo.findOne(filtro).lean();
}
static async updateUsuario(id, usuario){
  return await usuarioModelo.updateOne({_id:id}, usuario)
}
}

