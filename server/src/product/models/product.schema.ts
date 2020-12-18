import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    sub_category_id: { type: String, required: true },
    brand_id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: 'thumbnail.jpg' },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
ProductSchema.index(
  { sub_category_id: 1, brand_id: 1, name: 1 },
  { unique: true },
);
