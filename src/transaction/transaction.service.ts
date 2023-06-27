
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from './interface/transaction.interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';


@Injectable()
export class TransactionService {
    constructor(
        @InjectModel('Transaction') private readonly transactionModel: Model<TransactionDocument>,
        private AuthService: AuthService,
      ) {}

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        try {
          const createdTransaction = new this.transactionModel(createTransactionDto);
          return createdTransaction.save();
        } catch (error) {
          console.log(error);
        }
      }
      
      async deleteTransaction(transactionId: string): Promise<Transaction> {
        const deletedTransaction = await this.transactionModel.findByIdAndDelete(transactionId).exec();
        if (!deletedTransaction) {
          throw new NotFoundException('Transaction not found');
        }
        return deletedTransaction;
      }
      async getTransactionById(transactionId: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(transactionId).exec();
        if (!transaction) {
          throw new NotFoundException('Transaction not found');
        }
        return transaction;
      }
    
      async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
      }
      async updateTransaction(
        transactionId: string,
        updateTransactionDto: UpdateTransactionDto,
      ): Promise<Transaction> {
        console.log(updateTransactionDto);
        // updateTransactionDto['role'] = '';
        const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
          transactionId,
          updateTransactionDto,
          { new: true },
        );
    
        if (updatedTransaction) {
          return updatedTransaction;
        } else {
          throw new NotFoundException('Transaction not found');
        }
      }

}
