import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import {ProductOptionCursorPagination, ProductOptionType} from "./dto/product-option.dto";
import { CreateProductOptionInput } from './input/create-product-option.input';
import { UpdateProductOptionInput } from './input/update-product-option.input';
import {ProductOptionService} from "./product-option.service";

@Resolver(() => ProductOptionType)
export class ProductOptionResolver {
  constructor(private readonly service: ProductOptionService) {}

  @Mutation(() => ProductOptionType)
  createProductOption(@Args('create_input') create_input: CreateProductOptionInput) {
    return this.service.create(create_input);
  }

  @Query(() => ProductOptionCursorPagination, { name: 'product_options' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => ProductOptionType, { name: 'product_option' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => ProductOptionType)
  updateProductOption(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateProductOptionInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => ProductOptionType)
  removeProductOption(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
