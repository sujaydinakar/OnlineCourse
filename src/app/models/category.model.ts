export class ICategory {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;

  createdAt?: Date;
  createdBy?:string;
  createdRef?: any;
  updatedAt?: Date;
  updatedBy?:string;
  updatedRef?: any;

  status?: any;
  isDelete?: boolean;
}
