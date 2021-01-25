export class ICategory {
  key: string;
  name: string;
  order: number;
  kh_name: any;
  keywords: any;
  description?: any;

  categoryImagePath: any;
  categoryImageUrl: any;

  createdAt?: Date;
  createdBy?:string;
  updatedAt?: Date;
  updatedBy?:string;

  status?: any;
  isDelete?: boolean;
}
