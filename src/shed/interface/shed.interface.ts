import { Document } from 'mongoose';
export interface Shed extends Document {
  
    readonly Name: string;
    readonly healthCheckup: boolean;
    readonly  overseer: string;
    readonly henCount: number;
    readonly region: number;
    readonly site: number;
}
export type ShedDocument = Shed & Document;