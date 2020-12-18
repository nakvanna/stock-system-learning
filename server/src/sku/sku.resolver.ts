import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import { ProductOptionService } from 'src/product_option/product-option.service';
import {SkuCursorPagination, SkuType } from './dto/sku.dto';
import { CreateSkuInput } from './input/create-sku.input';
import { UpdateSkuInput } from './input/update-sku.input';
import { SkuService } from './sku.service';
import {ProductService} from "../product/product.service";
import {VariantType} from "../variant/dto/variant.dto";
import {ProductModel} from "../product/models/product.model";
import { SkuModel } from './models/sku.model';
import {ProductType} from "../product/dto/product.dto";

@Resolver(() => SkuType)
export class SkuResolver {
  constructor(
      private readonly service: SkuService,
      private readonly productOptionService: ProductOptionService,
      private readonly productService: ProductService,
  ) {}

  @Mutation(() => SkuType)
  async createSku(@Args('create_input') create_input: CreateSkuInput) {
    const sku = await this.service.create(create_input);
    create_input.create_product_option_input.map(async m => {
      // @ts-ignore
      await this.productOptionService.create({sku_id: sku._id, variant_option_id: m.variant_option_id})
    });
    return sku;
  }

  @Query(() => SkuCursorPagination, { name: 'skus' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => SkuType, { name: 'sku' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => SkuType)
  updateSku(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateSkuInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => SkuType)
  removeSku(@Args('id') id: string) {
    return this.service.remove(id);
  }

  @ResolveField(() => ProductType)
  product(@Parent() sku: SkuModel){
    return this.productService.findBySku(sku.product_id);
  }
}
