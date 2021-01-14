import { ICategory } from "./category.model";
import { ISubCategory } from "./subCategory.model";

export class ITopic {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;

  categoryKey: string;
  categoryRef: any;
  subcategoryKey: string;
  subcategoryRef: any;

  createdAt?: Date;
  createdBy?:string;
  createdRef?: any;
  updatedAt?: Date;
  updatedBy?:string;
  updatedRef?: any;

  status?: any;
  isDelete?: boolean;
}
