import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class ProductOptionType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  sku_id: string;
  @Field({ nullable: true })
  variant_option_id: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class ProductOptionCursorPagination extends CursorPagination(ProductOptionType) {}
