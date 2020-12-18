import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariantSchema } from './models/variant.schema';
import { VariantResolver } from './variant.resolver';
import { VariantService } from './variant.service';
import {ProductModule} from "../product/product.module";
import { VariantOptionModule } from 'src/variant-option/variant-option.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Variant', schema: VariantSchema }]),
      forwardRef(() => ProductModule),
      forwardRef(() => VariantOptionModule),
  ],
  providers: [VariantResolver, VariantService],
  exports: [VariantService]
})
export class VariantModule {}
