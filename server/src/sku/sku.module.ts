import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkuSchema } from './models/sku.schema';
import { SkuResolver } from './sku.resolver';
import { SkuService } from './sku.service';
import {SubCategoryModule} from "../sub-category/sub-category.module";
import {ProductOptionModule} from "../product_option/product-option.module";
import {ProductModule} from "../product/product.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Sku', schema: SkuSchema }]),
      forwardRef(() => ProductOptionModule),
      forwardRef(() => ProductModule),
  ],
  providers: [SkuResolver, SkuService],
  exports: [SkuService]
})
export class SkuModule {}
