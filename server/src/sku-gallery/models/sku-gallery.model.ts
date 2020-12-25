import {ErrorHandlingEntity} from '../../../shared/utils';

export interface SkuGalleryModel extends ErrorHandlingEntity {
    sku_id: string;
    image: string;
    status: boolean;
}
