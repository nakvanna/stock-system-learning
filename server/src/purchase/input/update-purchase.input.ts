import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdatePurchaseInput {
    @Field({nullable: true})
    name: string;
    @Field({nullable: true})
    status: boolean;
}
