import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User{
  @Prop()
  firstName: string;
  @Prop()
  email: string;
  @Prop()
  lastName: string;
  @Prop()
  phoneNumber: number;
  @Prop()
  role: string;
  @Prop()
  site: number;
  @Prop()
  region: number;
  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
