import mongoose from "mongoose";

const usersColeccion= "users";
const userSchema=  new mongoose.Schema({
    nombre: String,
    email: {type: String, unique: true},
    password: String
},
{timestamps:true, strict: false}

) 
export const usuarioModelo=mongoose.model(usersColeccion,userSchema);
