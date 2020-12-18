import { Field, InputType } from '@nestjs/graphql';
import { CreateVariantInput } from 'src/variant/input/create-variant.input';

@InputType()
export class CreateProductInput {
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
  //Variant input
  @Field(() => [CreateVariantInput],{ nullable: true })
  create_variant_input: string[];
}
