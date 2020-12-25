import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateSkuGalleryInput {
    @Field({nullable: true})
    sku_id: string;
    @Field({nullable: true})
    image: string;
}
