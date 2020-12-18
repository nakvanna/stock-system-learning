import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import {SubCategoryType} from "../../sub-category/dto/sub-category.dto";
import {BrandType} from "../../brand/dto/brand.dto";
import { VariantType } from 'src/variant/dto/variant.dto';

@ObjectType()
export class ProductType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  sub_category_id: string;
  @Field({ nullable: true })
  brand_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  slug: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  thumbnail: string;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => SubCategoryType)
  sub_category: string
  @Field(() => BrandType)
  brand: string
  @Field(() => [VariantType])
  variant: string[]
}

@ObjectType()
export class ProductCursorPagination extends CursorPagination(ProductType) {}
