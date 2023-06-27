import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { taskSchema } from './taskSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from 'src/logging.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [TaskController],
  providers: [TaskService,LoggerService],
})
export class TaskModule {}
