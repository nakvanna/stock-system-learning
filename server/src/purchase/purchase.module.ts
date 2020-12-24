import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductModule} from "../product/product.module";
import {PurchaseSchema} from './models/purchase.schema';
import {PurchaseResolver} from "./purchase.resolver";
import {PurchaseService} from './purchase.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Brand', schema: PurchaseSchema}]),
        forwardRef(() => ProductModule)
    ],
    providers: [PurchaseResolver, PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {
}