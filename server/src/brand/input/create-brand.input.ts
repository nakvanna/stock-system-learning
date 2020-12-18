import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field({ nullable: true })
  name: string;
}
