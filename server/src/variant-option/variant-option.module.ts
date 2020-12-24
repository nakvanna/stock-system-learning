import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {VariantOptionSchema} from './models/variant-option.schema';
import {VariantOptionResolver} from './variant-option.resolver';
import {VariantOptionService} from './variant-option.service';
import {ProductModule} from "../product/product.module";
import {VariantModule} from "../variant/variant.module";
import {ProductOptionModule} from "../product_option/product-option.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'VariantOption', schema: VariantOptionSchema},
        ]),
        forwardRef(() => ProductModule),
        forwardRef(() => VariantModule),
        forwardRef(() => ProductOptionModule),
    ],
    providers: [VariantOptionResolver, VariantOptionService],
    exports: [VariantOptionService]
})
export class VariantOptionModule {
}
