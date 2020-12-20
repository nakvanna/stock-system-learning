import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateVariantOptionInput {
    @Field({nullable: true})
    variant_id: string;
    @Field({nullable: true})
    name: string;
}

@InputType()
export class CreateVariantOptionInputs {
    @Field(() => [CreateVariantOptionInput], {nullable: true})
    multiple: string[]
    @Field(() => CreateVariantOptionInput, {nullable: true})
    single: string
}