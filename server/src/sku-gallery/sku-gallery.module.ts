import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SkuGallerySchema} from './models/sku-gallery.schema';
import {SkuGalleryResolver} from "./sku-gallery.resolver";
import {SkuGalleryService} from './sku-gallery.service';
import {SkuModule} from "../sku/sku.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'SkuGallery', schema: SkuGallerySchema}]),
        forwardRef(() => SkuModule)
    ],
    providers: [SkuGalleryResolver, SkuGalleryService],
    exports: [SkuGalleryService],
})
export class SkuGalleryModule {
}