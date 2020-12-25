import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';

@ObjectType()
export class SkuGalleryType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
    @Field({nullable: true})
    sku_id: string;
    @Field({nullable: true})
    image: string;
    @Field({nullable: true})
    status: boolean;
}

@ObjectType()
export class SkuGalleryCursorPagination extends CursorPagination(SkuGalleryType) {
}
