import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  fullName: string;
  phoneNumber?: string;
  emailAddress: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String }, // optional
    emailAddress: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
