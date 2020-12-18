import * as mongoose from 'mongoose';

export const SubCategorySchema = new mongoose.Schema(
  {
    category_id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
SubCategorySchema.index({ category_id: 1, name: 1 }, { unique: true });
