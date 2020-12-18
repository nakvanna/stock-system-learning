import { ErrorHandlingEntity } from '../../../shared/utils';

export interface SubCategoryModel extends ErrorHandlingEntity {
  id: string;
  category_id: string;
  name: string;
  status: boolean;
}
