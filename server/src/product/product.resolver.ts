import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {ProductCursorPagination, ProductType} from './dto/product.dto';
import {CreateProductInput} from './input/create-product.input';
import {ProductService} from './product.service';
import {UpdateProductInput} from "./input/update-product.input";
import {ProductModel} from "./models/product.model";
import {SubCategoryType} from 'src/sub-category/dto/sub-category.dto';
import {SubCategoryService} from "../sub-category/sub-category.service";
import {BrandType} from "../brand/dto/brand.dto";
import {BrandService} from "../brand/brand.service";
import {VariantService} from 'src/variant/variant.service';
import {VariantOptionService} from "../variant-option/variant-option.service";
import {VariantType} from "../variant/dto/variant.dto";

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(
        private readonly service: ProductService,
        private readonly subCategoryService: SubCategoryService,
        private readonly brandService: BrandService,
        private readonly variantService: VariantService,
        private readonly variantOptionsService: VariantOptionService
    ) {
    }

    @Mutation(() => ProductType)
    async createProduct(@Args('create_input') create_input: CreateProductInput) {
        const product = await this.service.create(create_input);
        if (product.success) {
            create_input.create_variant_input.map(async m => {
                // @ts-ignore
                await this.variantService.create({product_id: product._id, name: m.name}).then((data) => {
                    if (data.success) {
                        // @ts-ignore
                        m.create_variant_option_input.map(m1 => {
                            // @ts-ignore
                            this.variantOptionsService.create({variant_id: data._id, name: m1.name})
                        })
                    }
                });
            });
        }

        return product;
    }

    @Query(() => ProductCursorPagination, {name: 'products'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => ProductType, {name: 'product'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => ProductType)
    updateProduct(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateProductInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => ProductType)
    removeProduct(@Args('id') id: string) {
        return this.service.remove(id);
    }

    @ResolveField(() => SubCategoryType)
    sub_category(@Parent() product: ProductModel) {
        return this.subCategoryService.findByParent(product.sub_category_id);
    }

    @ResolveField(() => BrandType)
    brand(@Parent() product: ProductModel) {
        return this.brandService.findByParent(product.brand_id);
    }

    @ResolveField(() => [VariantType])
    variant(@Parent() product: ProductModel) {
        return this.variantService.findByProduct(product._id);
    }
}
