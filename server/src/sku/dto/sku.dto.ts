import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import {CategoryType} from "../../category/dto/category.dto";
import {SubCategoryType} from "../../sub-category/dto/sub-category.dto";
import {BrandType} from "../../brand/dto/brand.dto";
import {ProductType} from "../../product/dto/product.dto";

@ObjectType()
export class SkuType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  sku: string;
  @Field({ nullable: true })
  name: string; //Detail this product on name
  @Field({ nullable: true })
  ranking: number;
  @Field({ nullable: true })
  weight: number;
  @Field({ nullable: true })
  discount: number;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => ProductType)
  product: string;
}

@ObjectType()
export class SkuCursorPagination extends CursorPagination(SkuType) {}
