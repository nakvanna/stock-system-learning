import { Field, InputType } from '@nestjs/graphql';
import {CreateProductOptionInput} from "../../product_option/input/create-product-option.input";

@InputType()
export class CreateSkuInput {
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  sku: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  ranking: number;
  @Field({ nullable: true })
  weight: number;
  @Field({ nullable: true })
  discount: number;
  @Field({ nullable: true })
  price: number;
  //Product-option
  @Field(() => [CreateProductOptionInput],{ nullable: true })
  create_product_option_input: string[];
}
