import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {SkuGalleryCursorPagination, SkuGalleryType} from "./dto/sku-gallery.dto";
import {CreateSkuGalleryInput} from './input/create-sku-gallery.input';
import {UpdateSkuGalleryInput} from './input/update-sku-gallery.input';
import {SkuGalleryService} from './sku-gallery.service';

@Resolver(() => SkuGalleryType)
export class SkuGalleryResolver {
    constructor(private readonly service: SkuGalleryService) {
    }

    @Mutation(() => SkuGalleryType)
    createSkuGallery(@Args('create_input') create_input: CreateSkuGalleryInput) {
        return this.service.create(create_input);
    }

    @Query(() => SkuGalleryCursorPagination, {name: 'sku_galleries'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => SkuGalleryType, {name: 'sku_gallery'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => SkuGalleryType)
    updateSkuGallery(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateSkuGalleryInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => SkuGalleryType)
    removeSkuGallery(@Args('id') id: string) {
        return this.service.remove(id);
    }
}
