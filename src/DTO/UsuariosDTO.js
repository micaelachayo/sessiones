// DTO/usuariosDTO.js

export class UsuarioDTO {
  constructor(usuario) {
    this.first_name = usuario.nombre;
    this.last_name = usuario.apellido;
    this.email = usuario.email;
    this.age = usuario.age;
    
  }
}