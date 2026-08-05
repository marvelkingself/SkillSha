import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICertificate extends Document {
  credentialId: string;
  studentName: string;
  courseName: string;
  dateIssued: string;
  grade: string;
  instructor: string;
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  credentialId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  dateIssued: { type: String, required: true },
  grade: { type: String, required: true },
  instructor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Certificate = models.Certificate || model<ICertificate>("Certificate", CertificateSchema);
