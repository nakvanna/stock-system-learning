import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
  @Field({ nullable: true })
  category_id: string;
  @Field({ nullable: true })
  name: string;
}
