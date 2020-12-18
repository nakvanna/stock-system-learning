import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductOptionInput {
  @Field({ nullable: true })
  sku_id: string;
  @Field({ nullable: true })
  variant_option_id: string;
}
