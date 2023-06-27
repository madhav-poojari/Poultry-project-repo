import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from 'src/auth/auth.service';
  import { TaskService } from './task.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { RolesGuard } from 'src/common/gaurds/roles.guard';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { UsersService } from 'src/users/users.service';
  import { JwtService } from '@nestjs/jwt';
  import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
  
  @Controller('task')
  @ApiTags('task')
  export class TaskController {
    constructor(
      private readonly taskService: TaskService,
      private readonly authService: AuthService,
      private readonly jwtService: JwtService,
      private readonly userService: UsersService,
    ) {}
    //create task
    @Post()
    @ApiBody({ type: CreateTaskDto })
    async createTask(
      @Res() response,
      @Body() createTaskDto: CreateTaskDto,
    ) {
      try {
        const newTask = await this.taskService.create(
          createTaskDto,
        );
        return response.status(HttpStatus.CREATED).json({
          message: 'item has been created successfully',
          newTask,
        });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: item not created!',
          error: err,
        });
      }
    }
    //delete task
    @Delete('/:id')
    @Roles('admin')
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    async deleteTask(@Res() response, @Param('id') taskId: string) {
      try {
        const deletedTask = await this.taskService.deleteTask(
          taskId,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Task deleted successfully',
          deletedTask,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  
    //get all tasksroute
    @Get('/all')
    @ApiBearerAuth()
    @Roles('admin') // Specify the required roles for this route
    @UseGuards(RolesGuard)
    async getAll(@Res() response) {
      try {
        const taskData = await this.taskService.getAllTasks();
        return response.status(HttpStatus.OK).json({
          message: 'All Task data found successfully',
          taskData,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }

  

    @Put(':id')
    @Roles('admin')
    @ApiBearerAuth()
    @ApiBody({ type: UpdateTaskDto })
    async updateTask(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<any> {
      // Logic to update the task
      const updatedTask = await this.taskService.updateTask(
        id,
        updateTaskDto,
      );
      return updatedTask;
    }
  }
  