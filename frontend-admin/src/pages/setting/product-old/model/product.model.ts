import {VariantModel} from "../view/variant/model/variant.model";

export interface ProductModel {
  _id?: string;
  sub_category_id?: string | any;
  brand_id?: string | any;
  name?: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  product_status?: string;
  status?: boolean;
  create_variant_input?: [VariantModel];
}

// export interface VariantModel {
//   product_id: string
//   name: string
//   create_variant_option_input?: [VariantOptionModel] | string[];
// }

// export interface VariantOptionModel {
//   variant_id: string
//   name: string
// }

