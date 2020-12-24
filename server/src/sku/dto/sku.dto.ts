import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {ProductOptionType} from 'src/product_option/dto/product-option.dto';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';
import {ProductType} from "../../product/dto/product.dto";

@ObjectType()
export class SkuType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
    @Field({nullable: true})
    product_id: string;
    @Field({nullable: true})
    sku: string;
    @Field({nullable: true})
    name: string; //Detail this product on name
    @Field({nullable: true})
    ranking: number;
    @Field({nullable: true})
    weight: number;
    @Field({nullable: true})
    discount: number;
    @Field({nullable: true})
    price: number;
    @Field({nullable: true})
    status: boolean;
    @Field(() => ProductType)
    product: string;
    @Field(() => [ProductOptionType])
    product_option: string[];
}

@ObjectType()
export class SkuCursorPagination extends CursorPagination(SkuType) {
}
