import bcrypt from "bcrypt";
export const hashing= password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10));

//es para comparar la contrasena que escribí con el hash y ver que sean correctaas
export const validarPasword=(pass,hash)=>bcrypt.compareSync(pass,hash);