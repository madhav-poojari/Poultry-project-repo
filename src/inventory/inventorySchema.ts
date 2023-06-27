import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Inventory{
  @Prop()
  item: string;
  @Prop()
  description: string;
  @Prop()
  sharedAcross: string;
  @Prop()
  belongsTo: string;


}

export const inventorySchema = SchemaFactory.createForClass(Inventory);
