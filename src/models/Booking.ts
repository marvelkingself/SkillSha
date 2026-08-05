import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IBooking extends Document {
  name: string;
  mobile: string;
  dateTime: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  dateTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
