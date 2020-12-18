import * as mongoose from 'mongoose';

export const VariantSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
VariantSchema.index({ product_id: 1, name: 1 }, { unique: true });
