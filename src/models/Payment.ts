import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPayment extends Document {
  name: string;
  email: string;
  program: string;
  amountType: string;
  amount: number;
  gst: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, required: true },
  amountType: { type: String, required: true },
  amount: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Success" },
  createdAt: { type: Date, default: Date.now }
});

export const Payment = models.Payment || model<IPayment>("Payment", PaymentSchema);
