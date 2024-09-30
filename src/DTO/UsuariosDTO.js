// DTO/usuariosDTO.js

export class UsuariosDTO {
  constructor(usuario) {
    this.first_name = usuario.nombre;
    this.last_name = usuario.apellido;
    this.fullname=`${usuario.nombre} ${usuario.apellido}`
    this.email = usuario.email;
    this.age = usuario.age;
    
  }
}