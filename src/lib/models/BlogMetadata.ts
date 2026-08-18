import mongoose, { Schema } from "mongoose";

export interface IBlogMetadata {
  title: string;
  slug: string;
  keyword: string;
  seoScore: number;
  status: "draft" | "review" | "published" | "failed";
  excerpt: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogMetadataSchema = new Schema<IBlogMetadata>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    keyword: { type: String },
    seoScore: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "review", "published", "failed"], default: "draft" },
    excerpt: { type: String },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.BlogMetadata || mongoose.model<IBlogMetadata>("BlogMetadata", BlogMetadataSchema);
