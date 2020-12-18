import * as mongoose from 'mongoose';

export const ProductOptionSchema = new mongoose.Schema(
  {
    sku_id: { type: String, required: true },
    variant_option_id: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
ProductOptionSchema.index(
  { sku_id: 1, variant_option_id: 1 },
  { unique: true },
);
