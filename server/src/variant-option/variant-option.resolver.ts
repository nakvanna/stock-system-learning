import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {VariantOptionCursorPagination, VariantOptionType,} from './dto/variant-option.dto';
import {CreateVariantOptionInputs} from './input/create-variant-option.input';
import {VariantOptionService} from './variant-option.service';
import {UpdateVariantOptionInput} from './input/update-variant-option.input';

@Resolver(() => VariantOptionType)
export class VariantOptionResolver {
    constructor(private readonly service: VariantOptionService) {
    }

    @Mutation(() => VariantOptionType)
    async createVariantOption(
        @Args('create_input') create_input: CreateVariantOptionInputs,
    ) {
        try {
            await create_input.multiple.map(async (m: any) => {
                await this.service.create({variant_id: m.variant_id, name: m.name})
            })
            return {
                message: 'បានរក្សាទុក',
                success: true,
            }
        } catch (e) {
            return {
                message: e.message.split(':')[0],
                success: false
            }
        }
    }

    @Query(() => VariantOptionCursorPagination, {name: 'variant_options'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => VariantOptionType, {name: 'variant_option'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => VariantOptionType)
    updateVariantOption(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateVariantOptionInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => VariantOptionType)
    removeVariantOption(@Args('id') id: string) {
        return this.service.remove(id);
    }
}
