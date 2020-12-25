import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateSkuGalleryInput {
    @Field({nullable: true})
    sku_id: string;
    @Field({nullable: true})
    image: string;
    @Field({nullable: true})
    status: boolean;
}
