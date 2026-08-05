import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  programInterest?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  programInterest: { type: String, default: "AI Engineering Masterclass" },
  createdAt: { type: Date, default: Date.now }
});

export const User = models.User || model<IUser>("User", UserSchema);
