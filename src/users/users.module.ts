import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './userSchema';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LoggerService } from 'src/logging.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
    LoggerService
  ],
  exports: [UsersService],
})
export class UsersModule {}
