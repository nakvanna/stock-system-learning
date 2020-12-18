import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSkuInput {
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
  @Field({ nullable: true })
  status: boolean;
}
