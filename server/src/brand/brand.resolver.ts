import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import { BrandService } from './brand.service';
import { BrandCursorPagination, BrandType } from './dto/brand.dto';
import { CreateBrandInput } from './input/create-brand.input';
import { UpdateBrandInput } from './input/update-brand.input';

@Resolver(() => BrandType)
export class BrandResolver {
  constructor(private readonly service: BrandService) {}

  @Query(returns => String)
  helloWorld(){
    return 'Hello my world!';
  }
  @Mutation(() => BrandType)
  createBrand(@Args('create_input') create_input: CreateBrandInput) {
    return this.service.create(create_input);
  }

  @Query(() => BrandCursorPagination, { name: 'brands' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => BrandType, { name: 'brand' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => BrandType)
  updateBrand(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateBrandInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => BrandType)
  removeBrand(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
