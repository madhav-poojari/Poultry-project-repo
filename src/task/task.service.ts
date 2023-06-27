import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './interface/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      return createdTask.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(taskId: string): Promise<Task> {
    try {
      const deletedTask = await this.taskModel
        .findByIdAndDelete(taskId)
        .exec();
      if (!deletedTask) {
        throw new NotFoundException('Task not found');
      }
      return deletedTask;
    } catch (error) {
      throw new NotFoundException('task not found');
      return error;
    }
  }
  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
  async getTaskBySite(sitenum: string): Promise<Task[]> {
    const task = await this.taskModel
      .find({ belongsTo: sitenum, sharedAcross: 'site' })
      .exec();
    if (!task) {
      throw new NotFoundException('Site not found');
    }
    return task;
  }
  async getTaskByRegion(regionnum: string): Promise<Task[]> {
    const task = await this.taskModel
      .find({ belongsTo: regionnum, sharedAcross: 'region' })
      .exec();
    if (!task) {
      throw new NotFoundException('Region not found');
    }
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    console.log(updateTaskDto);
    // updateTaskDto['role'] = '';
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      { new: true },
    );

    if (updatedTask) {
      return updatedTask;
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
