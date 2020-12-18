import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVariantInput {
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
}
