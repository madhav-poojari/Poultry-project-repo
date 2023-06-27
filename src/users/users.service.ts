import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private AuthService: AuthService,
   
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      // createdUser.password= await bcrypt.hash(createUserDto.password, 12)
      return createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    else {
      console.log(user.password);
      if (password == user.password) {
      
        return user;
      } else return null;
    }
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getRegionUser(num: number): Promise<User[]> {
    const user = await this.userModel.find({ region: num }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getSiteUser(num: number): Promise<User[]> {
    const user = await this.userModel.find({ site: num }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log(updateUserDto);
    // updateUserDto['role'] = '';
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (updatedUser) {
      return updatedUser;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
