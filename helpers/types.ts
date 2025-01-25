import { Types } from 'mongoose';

export interface Customer {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
}
