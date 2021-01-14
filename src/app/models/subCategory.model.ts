import { ICategory } from "./category.model";

export class ISubCategory {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;
  categoryKey: string;
  categoryRef: any;

  createdAt?: Date;
  createdBy?:string;
  createdRef?: any;
  updatedAt?: Date;
  updatedBy?:string;
  updatedRef?: any;

  status?: any;
  isDelete?: boolean;
}
