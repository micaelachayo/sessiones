import mongoose from "mongoose";
import { v4 as UUID } from "uuid";
export const ticketModel = mongoose.model(
  "ticket",
  new mongoose.Schema(
    {
      code: { type: String, unique: true },
      purchase_datetime: Date,
      amount: Number,
      purchaser: { type: [] },
      detail: [
        {
          product: {
            type: {
              _id: { type: mongoose.Schema.Types.ObjectId, required: true },
              title: { type: String, required: true },
              price: { type: Number, required: true },
            },
            required: true,
          },
          quantity: { type: Number, required: true },
          total: { type: Number, required: true }, // Agregar total
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
