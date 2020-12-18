import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { SubCategorySchema } from './models/sub-category.schema';
import { SubCategoryResolver } from './sub-category.resolver';
import { SubCategoryService } from './sub-category.service';
import {ProductModule} from "../product/product.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SubCategory', schema: SubCategorySchema },
    ]),
    forwardRef(() => CategoryModule),
    forwardRef(() => ProductModule)
  ],
  providers: [SubCategoryResolver, SubCategoryService],
  exports: [SubCategoryService]
})
export class SubCategoryModule {}
