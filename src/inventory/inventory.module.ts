import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { inventorySchema } from './inventorySchema';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from 'src/logging.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: inventorySchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService,LoggerService],
})
export class InventoryModule {}
