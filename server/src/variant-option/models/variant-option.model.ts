import { ErrorHandlingEntity } from '../../../shared/utils';

export interface VariantOptionModel extends ErrorHandlingEntity {
  variant_id: string;
  name: string;
  status: boolean;
}
