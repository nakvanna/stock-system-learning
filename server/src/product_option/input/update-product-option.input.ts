import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductOptionInput {
  @Field({ nullable: true })
  sku_id: string;
  @Field({ nullable: true })
  product_option_id: string;
  @Field({ nullable: true })
  status: boolean;
}
