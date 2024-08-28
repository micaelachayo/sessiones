import mongoose from "mongoose";
 export const conectMongoDB=async()=>{
     try {
         await mongoose.connect('mongodb+srv://micaelachayo:U7686jE@coder70020.sggsqiu.mongodb.net/login')
         console.log(`Conexión a DB establecida`)
     } catch (err) {
         console.log(`Error al conectarse con el servidor de BD: ${err}`)
     }
 }
