import mongoose from "mongoose";

export const usuarioModelo=mongoose.model(
    "users",
    new mongoose.Schema(
        {
            nombre: String,
            email: {
                type: String, unique: true
            }, 
            password: String,
            cart: {
                type: mongoose.Schema.Types.ObjectId, ref:"carts"
            },
            role: {
                type: String, default: "user"
            }
        },
        {
            timestamps:true, strict: false
        }
    )
)