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


@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create')
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
  async loginUser(
    @Res() response,
    @Body() loginUserDto: LoginUserDto,
    @Req() req,
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

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been succesfully logged in',
        token,
      });
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      return response.json(err.response);
    }
  }

}
