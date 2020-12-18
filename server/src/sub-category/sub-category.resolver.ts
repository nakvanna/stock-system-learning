import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import {
  SubCategoryCursorPagination,
  SubCategoryType,
} from './dto/sub-category.dto';
import { CreateSubCategoryInput } from './input/create-sub-category.input';
import { UpdateSubCategoryInput } from './input/update-sub-category.input';
import { SubCategoryService } from './sub-category.service';
import {CategoryType} from "../category/dto/category.dto";
import {CategoryService} from "../category/category.service";
import {SubCategoryModel} from "./models/sub-category.model";

@Resolver(() => SubCategoryType)
export class SubCategoryResolver {
  constructor(
      private readonly service: SubCategoryService,
      private readonly categoryService: CategoryService
      ) {}

  @Mutation(() => SubCategoryType)
  createSubCategory(
    @Args('create_input') create_input: CreateSubCategoryInput,
  ) {
    return this.service.create(create_input);
  }

  @Query(() => SubCategoryCursorPagination, { name: 'sub_categories' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => SubCategoryType, { name: 'sub_category' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => SubCategoryType)
  updateSubCategory(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateSubCategoryInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => SubCategoryType)
  removeSubCategory(@Args('id') id: string) {
    return this.service.remove(id);
  }

  @ResolveField(() => CategoryType)
  category(@Parent() sub_category: SubCategoryModel){
    return this.categoryService.findByParent(sub_category.category_id);
  }
}
