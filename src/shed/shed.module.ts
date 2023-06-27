import { Module } from '@nestjs/common';
import { ShedController } from './shed.controller';
import { ShedService } from './shed.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { shedSchema } from './shedSchema';
import { UsersModule } from 'src/users/users.module';
import { LoggerService } from 'src/logging.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Shed', schema: shedSchema}]),AuthModule,UsersModule],

  controllers: [ShedController],
  providers: [ShedService,LoggerService]
})
export class ShedModule {}
