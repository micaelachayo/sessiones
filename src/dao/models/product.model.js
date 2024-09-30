
 import mongoose from "mongoose";


export const productModel=mongoose.model(
   "products", 
   new mongoose.Schema({
 title:{
    type: String,
    require: true //que si o si tenga titulo
 },
 description:{
    type: String
 },
 code:{
    type: String,
    unique: true //que sea unico el código.
 },
 stock:{
    type: Number
 },
 status:{
    type: Boolean,
    default: true
 },
 category:{
    type: String
 },
 price:{
    type: Number,
    default: 0
 },
 thumbnail:{
    type: Array,
    default:[]
 }
}, {timestamps:true, strict:false}))

