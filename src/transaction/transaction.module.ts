import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { transactionSchema } from './transactionSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerService } from 'src/logging.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Transaction', schema: transactionSchema}]),AuthModule],
  controllers: [TransactionController],
  providers: [TransactionService, LoggerService]
})
export class TransactionModule {}
