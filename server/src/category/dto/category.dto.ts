import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class CategoryType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class CategoryCursorPagination extends CursorPagination(CategoryType) {}
