// DTO/usuariosDTO.js

export class UsuariosDTO {
  constructor(usuario) {
    this.first_name = usuario.nombre;
    this.last_name = usuario.apellido;
    this.fullname=`${usuario.nombre} ${usuario.apellido}`
    
    this.age = usuario.age;
    this.role=usuario.rol
    
  }
}