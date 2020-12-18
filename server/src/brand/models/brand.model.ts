import { ErrorHandlingEntity } from '../../../shared/utils';

export interface BrandModel extends ErrorHandlingEntity {
  name: string;
  status: boolean;
}
