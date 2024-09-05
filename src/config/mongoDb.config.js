import mongoose from "mongoose";
import { config } from "./config.js";

 export const conectMongoDB=async()=>{
     try {
         await mongoose.connect(config.MONGO_URL , {
            dbName: config.DB_NAME
        })
         console.log(`Conexión a DB establecida`)
     } catch (err) {
         console.log(`Error al conectarse con el servidor de BD: ${err}`)
     }
 }
