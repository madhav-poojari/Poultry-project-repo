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
import { ShedService } from './shed.service';
import { CreateShedDto } from './dto/create-shed.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { UpdateShedDto } from './dto/update-shed.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('shed')
@ApiTags('shed')
export class ShedController {
  constructor(
    private readonly shedService: ShedService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  //create shed
  @Post()
  @ApiBody({ type: CreateShedDto })
  async createShed(@Res() response, @Body() createShedDto: CreateShedDto) {
    try {
      const newShed = await this.shedService.create(createShedDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'shed has been created successfully',
        newShed,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: shed not created!',
        error: err,
      });
    }
  }
  //delete shed
  @Delete('/:id')
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  async deleteShed(@Res() response, @Param('id') shedId: string) {
    try {
      const deletedShed = await this.shedService.deleteShed(shedId);
      return response.status(HttpStatus.OK).json({
        message: 'Shed deleted successfully',
        deletedShed,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //get all shedsroute
  @Get('/all')
  @ApiBearerAuth()
  @Roles('admin') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getAll(@Res() response) {
    try {
      const shedData = await this.shedService.getAllSheds();
      return response.status(HttpStatus.OK).json({
        message: 'All Shed data found successfully',
        shedData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/site') // Specify the required roles for this route
  async getSiteShed(@Res() response, @Req() request) {
    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });

      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      const shedData = await this.shedService.getShedBySite(user['site']);
      return response.status(HttpStatus.OK).json({
        message: 'Found Shed',
        shedData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/region')
  @ApiBearerAuth()
  @Roles('region-manager') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getRegionShed(@Res() response, @Req() request) {
    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });
      // json[""]
      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      const shedData = await this.shedService.getShedByRegion(user['region']);
      return response.status(HttpStatus.OK).json({
        message: 'Found Shed',
        shedData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  @ApiBearerAuth()
  @Roles('admin', 'shed-manager') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getShedID(@Res() response, @Param('id') shedId: string) {
    try {
      const shedData = await this.shedService.getShedById(shedId);
      return response.status(HttpStatus.OK).json({
        message: 'Found Shed',
        shedData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateShedDto })
  async updateShed(
    @Param('id') id: string,
    @Body() updateShedDto: UpdateShedDto,
  ): Promise<any> {
    // Logic to update the shed
    const updatedShed = await this.shedService.updateShed(id, updateShedDto);
    return updatedShed;
  }
}
