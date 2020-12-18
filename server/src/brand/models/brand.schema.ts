import * as mongoose from 'mongoose';

export const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
BrandSchema.index({ name: 1 }, { unique: true });
