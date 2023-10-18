import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Note{
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  userID: string;
  @Prop()
  isCompleted: boolean;
  @Prop()
  deadline: string;
  
}

export const noteSchema = SchemaFactory.createForClass(Note);
