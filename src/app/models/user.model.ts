export class IUser {
  key: string;
  name: string;
  email: string;
  uid: string

  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  status?: any;
  isDelete?: boolean;
}
