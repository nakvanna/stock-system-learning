import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {BrandModule} from './brand/brand.module';
import {CategoryModule} from './category/category.module';
import {SubCategoryModule} from './sub-category/sub-category.module';
import {VariantModule} from './variant/variant.module';
import {VariantOptionModule} from './variant-option/variant-option.module';
import {ProductModule} from './product/product.module';
import {SkuModule} from './sku/sku.module';
import {ProductOptionModule} from './product_option/product-option.module';
import {SkuGalleryModule} from './sku-gallery/sku-gallery.module';

@Module({
    imports: [
        GraphQLModule.forRoot({autoSchemaFile: 'schema.gql'}),
        MongooseModule.forRoot(
            'mongodb+srv://nakvanna:HswQ5wxCARUyZs5I@cluster0.fokwn.mongodb.net/learning-db?retryWrites=true&w=majority',
        ),
        CategoryModule,
        SubCategoryModule,
        ProductModule,
        BrandModule,
        VariantModule,
        VariantOptionModule,
        SkuModule,
        ProductOptionModule,
        SkuGalleryModule
    ],
})
export class AppModule {
}
