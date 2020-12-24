import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {PurchaseCursorPagination, PurchaseType} from "./dto/purchase.dto";
import {PurchaseService} from './purchase.service';
import {CreatePurchaseInput} from "./input/create-purchase.input";
import {UpdatePurchaseInput} from './input/update-purchase.input';

@Resolver(() => PurchaseType)
export class PurchaseResolver {
    constructor(private readonly service: PurchaseService) {
    }

    @Mutation(() => PurchaseType)
    createPurchase(@Args('create_input') create_input: CreatePurchaseInput) {
        return this.service.create(create_input);
    }

    @Query(() => PurchaseCursorPagination, {name: 'brands'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => PurchaseType, {name: 'brand'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => PurchaseType)
    updatePurchase(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdatePurchaseInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => PurchaseType)
    removePurchase(@Args('id') id: string) {
        return this.service.remove(id);
    }
}
