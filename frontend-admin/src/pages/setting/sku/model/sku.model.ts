export interface SkuModel {
  _id?: string;
  product_id?: string | any;
  sku?: string;
  name?: string;
  ranking?: number;
  weight?: number;
  discount?: number;
  price?: number;
  status?: boolean;
  create_product_option_input: [] | any;
}

export interface ProductOptionModel {
  sku_id: string
  variant_option_id: string
}
