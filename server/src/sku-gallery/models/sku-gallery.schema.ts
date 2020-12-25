import * as mongoose from 'mongoose';

export const SkuGallerySchema = new mongoose.Schema(
    {
        sku_id: {type: String, required: true},
        image: {type: String, required: true},
        status: {type: Boolean, default: true},
    },
    {timestamps: true},
);
// Create index to check duplicate one or multi field.
SkuGallerySchema.index({sku_id: 1, name: 1}, {unique: true});
