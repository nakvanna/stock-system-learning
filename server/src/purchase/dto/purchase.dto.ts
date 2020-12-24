import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';

@ObjectType()
export class PurchaseType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
    @Field({nullable: true})
    status: boolean;
}

@ObjectType()
export class PurchaseCursorPagination extends CursorPagination(PurchaseType) {
}
