import * as mongoose from 'mongoose';

export const SkuSchema = new mongoose.Schema(
    {
        product_id: {type: String, required: true},
        sku: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        ranking: {type: Number, default: 0},
        weight: {type: Number, required: true},
        discount: {type: Number, default: 0},
        price: {type: Number, required: true},
        status: {type: Boolean, default: true},
    },
    {timestamps: true},
);
// Create index to check duplicate one or multi field.
// SkuSchema.index({ name: 1 }, { unique: true });
