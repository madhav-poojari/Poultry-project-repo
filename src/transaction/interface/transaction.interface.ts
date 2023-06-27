import { Document } from 'mongoose';
export interface Transaction extends Document {
  
    readonly transactionType: string;
    readonly title: string;
    readonly description: string;
    readonly amount: number;
    readonly overseerID: string;
    readonly site: number;
    readonly region: number;
}
export type TransactionDocument = Transaction & Document;