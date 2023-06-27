import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ShedModule } from './shed/shed.module';
import { InventoryModule } from './inventory/inventory.module';
import { TaskModule } from './task/task.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { LoggerService } from './logging.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://junith:9oetA6mMXTEfFlYE@cluster0.lihyu7f.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'poultryDB',
      },
    ),
    UsersModule,
    TransactionModule,
    ShedModule,
    InventoryModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
