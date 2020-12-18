import {Field, InputType} from '@nestjs/graphql';
import {CreateVariantOptionInput} from "../../variant-option/input/create-variant-option.input";

@InputType()
export class CreateVariantInput {
    @Field({nullable: true})
    product_id: string;
    @Field({nullable: true})
    name: string;
    //Variant option input
    @Field(() => [CreateVariantOptionInput], {nullable: true})
    create_variant_option_input: string[];
}

@InputType()
export class CreateVariantInputs {
    @Field(() => [CreateVariantInput], {nullable: true})
    multiple?: string[]
    @Field(() => CreateVariantInput, {nullable: true})
    single?: string
}
