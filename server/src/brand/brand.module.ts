import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { BrandSchema } from './models/brand.schema';
import {ProductModule} from "../product/product.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
    forwardRef(() => ProductModule)
  ],
  providers: [BrandResolver, BrandService],
  exports: [BrandService],
})
export class BrandModule {}