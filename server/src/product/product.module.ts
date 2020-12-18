import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.schema';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import {SubCategoryModule} from "../sub-category/sub-category.module";
import { BrandModule } from 'src/brand/brand.module';
import { VariantModule } from 'src/variant/variant.module';
import {VariantOptionModule} from "../variant-option/variant-option.module";
import { SkuModule } from 'src/sku/sku.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      forwardRef(() => SubCategoryModule),
      forwardRef(() => BrandModule),
      forwardRef(() => VariantModule),
      forwardRef(() => VariantOptionModule),
      forwardRef(() => SkuModule),
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService]
})
export class ProductModule {}
