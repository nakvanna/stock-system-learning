import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductOptionSchema} from './models/product-option.schema';
import {ProductOptionResolver} from './product-option.resolver';
import {ProductOptionService} from './product-option.service';
import {SkuModule} from "../sku/sku.module";
import {VariantOptionModule} from "../variant-option/variant-option.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'ProductOption', schema: ProductOptionSchema},
        ]),
        forwardRef(() => SkuModule),
        forwardRef(() => VariantOptionModule)
    ],
    providers: [ProductOptionResolver, ProductOptionService],
    exports: [ProductOptionService]
})
export class ProductOptionModule {
}
