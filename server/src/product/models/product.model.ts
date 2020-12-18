import { ErrorHandlingEntity } from '../../../shared/utils';

export interface ProductModel extends ErrorHandlingEntity {
  sub_category_id: string;
  brand_id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: boolean;
}
