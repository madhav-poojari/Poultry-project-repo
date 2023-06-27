import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory, InventoryDocument } from './interface/inventory.interface';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel('Inventory')
    private readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    try {
      const createdInventory = new this.inventoryModel(createInventoryDto);
      return createdInventory.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteInventory(inventoryId: string): Promise<Inventory> {
    try {
      const deletedInventory = await this.inventoryModel
        .findByIdAndDelete(inventoryId)
        .exec();
      if (!deletedInventory) {
        throw new NotFoundException('Inventory not found');
      }
      return deletedInventory;
    } catch (error) {
      throw new NotFoundException('inventory not found');
      return error;
    }
  }
  async getInventoryById(inventoryId: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(inventoryId).exec();
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }
    return inventory;
  }
  async getInventoryBySite(sitenum: string): Promise<Inventory[]> {
    const inventory = await this.inventoryModel
      .find({ belongsTo: sitenum, sharedAcross: 'site' })
      .exec();
    if (!inventory) {
      throw new NotFoundException('Site not found');
    }
    return inventory;
  }
  async getInventoryByRegion(regionnum: string): Promise<Inventory[]> {
    const inventory = await this.inventoryModel
      .find({ belongsTo: regionnum, sharedAcross: 'region' })
      .exec();
    if (!inventory) {
      throw new NotFoundException('Region not found');
    }
    return inventory;
  }

  async getAllInventorys(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async updateInventory(
    inventoryId: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    console.log(updateInventoryDto);
    // updateInventoryDto['role'] = '';
    const updatedInventory = await this.inventoryModel.findByIdAndUpdate(
      inventoryId,
      updateInventoryDto,
      { new: true },
    );

    if (updatedInventory) {
      return updatedInventory;
    } else {
      throw new NotFoundException('Inventory not found');
    }
  }
}
