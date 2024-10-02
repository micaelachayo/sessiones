// DTO/UsuariosDTO.js
export class UsuariosDTO {
  constructor(usuario) {
    this.first_name = usuario.first_name;
    this.last_name = usuario.last_name;
    this.fullname = `${usuario.first_name} ${usuario.last_name}`;
    this.age = usuario.age;
    this.role = usuario.role;
    this.email = usuario.email;
  }
}
