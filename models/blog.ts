import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema({
  he: { type: String, required: true },
  ar: { type: String, required: true },
  en: { type: String, required: true },
}, { _id: false });

const localizedTagsSchema = new mongoose.Schema({
  he: [{ type: String }],
  ar: [{ type: String }],
  en: [{ type: String }],
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  title: localizedStringSchema,
  content: localizedStringSchema,
  tags: localizedTagsSchema,
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  coverImage: { type: String },
  published: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
