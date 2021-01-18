import { ICategory } from "./category.model";
import { ISubCategory } from "./subCategory.model";

export class ICourse {
  key: string = null;
  title: string = null;
  subtitle: string = null;
  description: any = null;
  keywords: any = null;
  language: any = null;
  primaryTaught: string = null;
  price: any = null;
  welcome_message: any = null;
  congratulation_message: any = null;
  
  courseImageUrl: string = null;
  courseImagePath: string = null;
  promotionVideoUrl: string = null;
  promotionVideoPath: string = null;
  
  arrStudentObjective: Array<string> = [];
  arrStudentRequirement: Array<string> = [];
  arrTargetStudent: Array<string> = [];

  level: any = null;
  category: any = null;
  subcategory: any = null;

  createdAt?: Date = null;
  createdBy?: any = null;
  updatedAt?: Date = null;
  updatedBy?: any = null;

  status?: any = null;
  isDelete?: boolean = null;
}
