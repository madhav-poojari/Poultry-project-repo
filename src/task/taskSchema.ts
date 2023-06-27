import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Task{
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  overseerID: string;
  @Prop()
  isCompleted: boolean;
  @Prop()
  deadline: string;
  
}

export const taskSchema = SchemaFactory.createForClass(Task);
