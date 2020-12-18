import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import {VariantOptionType} from "../../variant-option/dto/variant-option.dto";

@ObjectType()
export class VariantType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => [VariantOptionType])
  variant_option: string[];
}

@ObjectType()
export class VariantCursorPagination extends CursorPagination(VariantType) {}
