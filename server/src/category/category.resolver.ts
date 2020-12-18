import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import { UpdateCategoryInput } from './input/update-category.input';
import { CategoryCursorPagination, CategoryType } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './input/create-category.input';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private readonly service: CategoryService) {}

  @Mutation(() => CategoryType)
  createCategory(@Args('create_input') create_input: CreateCategoryInput) {
    return this.service.create(create_input);
  }

  @Query(() => CategoryCursorPagination, { name: 'categories' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => CategoryType, { name: 'category' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateCategoryInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => CategoryType)
  removeCategory(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
