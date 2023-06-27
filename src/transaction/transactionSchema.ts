import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Transaction{
  @Prop()
  transactionType: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  amount: number;
  @Prop()
  overseerID: string;
  @Prop()
  site: number;
  @Prop()
  region: number;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);
