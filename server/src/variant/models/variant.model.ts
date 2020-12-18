import { ErrorHandlingEntity } from '../../../shared/utils';

export interface VariantModel extends ErrorHandlingEntity {
  product_id: string;
  name: string;
  status: boolean;
}
