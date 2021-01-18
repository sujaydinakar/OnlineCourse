import { ICategory } from "./category.model";
import { ISubCategory } from "./subCategory.model";

export class ITopic {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;

  category: any;
  subcategory: any;

  createdAt?: Date;
  createdBy?: any;
  updatedAt?: Date;
  updatedBy?: any;

  status?: any;
  isDelete?: boolean;
}
