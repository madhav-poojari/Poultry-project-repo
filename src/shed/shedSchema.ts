import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Shed{
  @Prop()
  Name: string;
  @Prop()
  healthCheckup: boolean;
  @Prop()
  overseer: string;
  @Prop()
  henCount: number;
  @Prop()
  region: number;
  @Prop()
  site: number;

}

export const shedSchema = SchemaFactory.createForClass(Shed);
