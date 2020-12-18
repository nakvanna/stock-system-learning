import {VariantOptionModel} from "../view/variant-option/model/variant-option.model";

export interface VariantModel {
  _id?: string;
  product_id?: string;
  name?: string;
  create_variant_option_input?: [VariantOptionModel] | string[];
  status?: boolean;
}
