import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {VariantCursorPagination, VariantType} from './dto/variant.dto';
import {CreateVariantInputs} from './input/create-variant.input';
import {UpdateVariantInput} from './input/update-variant.input';
import {VariantService} from './variant.service';
import {VariantOptionType} from "../variant-option/dto/variant-option.dto";
import {VariantModel} from "./models/variant.model";
import {VariantOptionService} from "../variant-option/variant-option.service";

@Resolver(() => VariantType)
export class VariantResolver {
    constructor(
        private readonly service: VariantService,
        private readonly variantOptionService: VariantOptionService
    ) {
    }

    @Mutation(() => VariantType)
    createVariant(@Args('create_input') create_input: CreateVariantInputs) {
        try {
            create_input.multiple.map(async item => {
                //@ts-ignore
                await this.service.create({product_id: item.product_id, name: item.name}).then((data) => {
                    //@ts-ignore
                    item.create_variant_option_input.map(async (item1: any) => {
                        // @ts-ignore
                        await this.variantOptionService.create({variant_id: data._id, name: item1.name});
                    });
                });
            });
            return {
                message: 'បានរក្សាទុក',
                success: true
            }
        } catch (e) {
            return {
                message: e.message.split(':')[0],
                success: false
            }
        }
    }

    @Query(() => VariantCursorPagination, {name: 'variants'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => VariantType, {name: 'variant'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => VariantType)
    updateVariant(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateVariantInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => VariantType)
    removeVariant(@Args('id') id: string) {
        return this.service.remove(id);
    }

    @ResolveField(() => [VariantOptionType])
    variant_option(@Parent() variant: VariantModel) {
        return this.variantOptionService.findByVariant(variant._id)
    }
}
