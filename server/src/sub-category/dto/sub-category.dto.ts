import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import {CategoryType} from "../../category/dto/category.dto";

@ObjectType()
export class SubCategoryType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  category_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => CategoryType)
  category: string;
}

@ObjectType()
export class SubCategoryCursorPagination extends CursorPagination(
  SubCategoryType,
) {}
