import { ICategory } from "./category.model";

export class ISubCategory {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;
  category: any;

  createdAt?: Date;
  createdBy?: any;
  updatedAt?: Date;
  updatedBy?: any;

  status?: any;
  isDelete?: boolean;
}
