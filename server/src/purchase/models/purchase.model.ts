import {ErrorHandlingEntity} from '../../../shared/utils';

export interface PurchaseModel extends ErrorHandlingEntity {
    name: string;
    status: boolean;
}
