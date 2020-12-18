import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
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
}
