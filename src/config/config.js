import dotenv from "dotenv"
dotenv.config({
    path:"./src/.env", override:true
})
export const config={
    PORT: process.env.PORT ||3000,
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    DB_NAME: process.env.DB_NAME,
    EMAIL: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}