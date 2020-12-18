export interface SubCategoryModel {
  _id?: string;
  category?: {
    _id: string;
    name: string;
  };
  name?: string;
  status?: boolean;
  data?: any;
}
