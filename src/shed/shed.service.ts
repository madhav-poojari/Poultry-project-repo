import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateShedDto } from './dto/create-shed.dto';
import { Shed, ShedDocument } from './interface/shed.interface';
import { UpdateShedDto } from './dto/update-shed.dto';

@Injectable()
export class ShedService {
  constructor(
    @InjectModel('Shed') private readonly shedModel: Model<ShedDocument>,
  ) {}

  async create(createShedDto: CreateShedDto): Promise<Shed> {
    try {
      const createdShed = new this.shedModel(createShedDto);
      return createdShed.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteShed(shedId: string): Promise<Shed> {
    try {
      const deletedShed = await this.shedModel.findByIdAndDelete(shedId).exec();
      if (!deletedShed) {
        throw new NotFoundException('Shed not found');
      }
      return deletedShed;
    } catch (error) {
      throw new NotFoundException('shed not found');
      return error;
    }
  }
  async getShedById(shedId: string): Promise<Shed> {
    const shed = await this.shedModel.findById(shedId).exec();
    if (!shed) {
      throw new NotFoundException('Shed not found');
    }
    return shed;
  }
  async getShedBySite(sitenum: number): Promise<Shed[]> {
    const shed = await this.shedModel.find({ site: sitenum }).exec();
    if (!shed) {
      throw new NotFoundException('Site not found');
    }
    return shed;
  }  
  async getShedByRegion(regionnum: number): Promise<Shed[]> {
    const shed = await this.shedModel.find({ region: regionnum}).exec();
    if (!shed) {
      throw new NotFoundException('Region not found');
    }
    return shed;
  }

  async getAllSheds(): Promise<Shed[]> {
    return this.shedModel.find().exec();
  }


  async updateShed(
    shedId: string,
    updateShedDto: UpdateShedDto,
  ): Promise<Shed> {
    console.log(updateShedDto);
    // updateShedDto['role'] = '';
    const updatedShed = await this.shedModel.findByIdAndUpdate(
      shedId,
      updateShedDto,
      { new: true },
    );

    if (updatedShed) {
      return updatedShed;
    } else {
      throw new NotFoundException('Shed not found');
    }
  }
}
