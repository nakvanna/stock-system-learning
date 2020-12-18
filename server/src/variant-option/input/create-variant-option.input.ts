import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVariantOptionInput {
  @Field({ nullable: true })
  variant_id: string;
  @Field({ nullable: true })
  name: string;
}
