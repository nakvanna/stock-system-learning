import { ErrorHandlingEntity } from '../../../shared/utils';

export interface ProductOptionModel extends ErrorHandlingEntity {
  sku_id: string;
  variant_option_id: string;
  status: boolean;
}
