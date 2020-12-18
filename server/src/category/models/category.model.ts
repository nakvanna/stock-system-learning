import { ErrorHandlingEntity } from '../../../shared/utils';

export interface CategoryModel extends ErrorHandlingEntity {
  name: string;
  status: boolean;
}
