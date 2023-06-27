import { Document } from 'mongoose';
export interface User extends Document {
  readonly firstName: string;
  readonly email: string;
  password: string;
  readonly lastName: string;
  readonly phoneNumber: number;
  readonly role: string;
  readonly site: number;
  readonly region: number;
}
export type UserDocument = User & Document;