import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategorySchema } from './models/category.schema';
import {SubCategoryModule} from "../sub-category/sub-category.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
      forwardRef(() => SubCategoryModule)
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
