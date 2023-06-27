import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LoggerService } from 'src/logging.service';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: err,
      });
    }
  }

  //login
  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiBody({ type: LoginUserDto })
  async loginUser(
    @Res() response,
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
  ) {
    // check if emailexists , if yes fetch user
    // check passwords,
    // generate token , add role and something in the payload
    const { email, password } = loginUserDto;
    const start = Date.now();
    try {
      const user = await this.userService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = await this.authService.generateToken(user);
      console.log(token);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(req, executionTime);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been succesfully logged in',
        token,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(req, executionTime, err);
      return response.json(err.response);
    }
  }

  //get all users
  @Get('/all')
  @ApiBearerAuth()
  @Roles('admin') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getAll(@Res() response, @Req() req: Request) {
    const start = Date.now();

    try {
      const userData = await this.userService.getAllUsers();
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(req, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'All User data found successfully',
        userData,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(req, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }
  //site
  @Get('/site')
  @ApiBearerAuth()
  @Roles('site-manager')
  @UseGuards(RolesGuard)
  async getSiteUsers(@Res() response, @Req() request) {
    const start = Date.now();
    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });
      // json[""]
      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      // console.log(user);
      const userData = await this.userService.getSiteUser(user['site']);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(request, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'Site User data found successfully',
        userData,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(request, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/region')
  @ApiBearerAuth()
  @Roles('region-manager') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getRegionUsers(@Res() response, @Req() request) {
    const start = Date.now();

    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });
      // json[""]
      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      const userData = await this.userService.getRegionUser(user['region']);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(request, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'Region User data found successfully',
        userData,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(request, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  @ApiBearerAuth()
  @Roles('shed-manager') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getUserID(
    @Res() response,
    @Param('id') userId: string,
    @Req() req: Request,
  ) {
    const start = Date.now();
    try {
      const userData = await this.userService.getUserById(userId);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(req, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'Found User',
        userData,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(req, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @Roles('admin')
  async deleteUser(
    @Res() response,
    @Param('id') userId: string,
    @Req() req: Request,
  ) {
    const start = Date.now();
    try {
      const deletedUser = await this.userService.deleteUser(userId);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(req, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(req, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }
  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @Roles('admin')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<any> {
    const start = Date.now();
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDto);

      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logRequestInfo(req, executionTime);
      return response.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        updatedUser,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(req, executionTime, err);
      return response.status(err.status).json(err.response);
    }
  }
}
