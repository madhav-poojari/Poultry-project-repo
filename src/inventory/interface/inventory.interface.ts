import { Document } from 'mongoose';
export interface Inventory extends Document {
  readonly item: string;
  readonly description: string;
  readonly belongsTo: string;
  readonly sharedAcross: string;
}
export type InventoryDocument = Inventory & Document;
