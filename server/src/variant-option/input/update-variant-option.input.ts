import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVariantOptionInput {
  @Field({ nullable: true })
  variant_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  status: boolean;
}
