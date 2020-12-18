import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSubCategoryInput {
  @Field({ nullable: true })
  category_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
}
