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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('inventory')
@ApiTags('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  //create inventory
  @Post()
  @ApiBody({ type: CreateInventoryDto })
  async createInventory(
    @Res() response,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    try {
      const newInventory = await this.inventoryService.create(
        createInventoryDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'item has been created successfully',
        newInventory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: item not created!',
        error: err,
      });
    }
  }
  //delete inventory
  @Delete('/:id')
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  async deleteInventory(@Res() response, @Param('id') inventoryId: string) {
    try {
      const deletedInventory = await this.inventoryService.deleteInventory(
        inventoryId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Inventory deleted successfully',
        deletedInventory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //get all inventorysroute
  @Get('/all')
  @ApiBearerAuth()
  @Roles('admin') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getAll(@Res() response) {
    try {
      const inventoryData = await this.inventoryService.getAllInventorys();
      return response.status(HttpStatus.OK).json({
        message: 'All Inventory data found successfully',
        inventoryData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/site') // Specify the required roles for this route
  @ApiBearerAuth()
  @Roles('admin')
  async getSiteInventory(@Res() response, @Req() request) {
    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });

      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      const inventoryData = await this.inventoryService.getInventoryBySite(
        user['site'].toString(),
      );
      return response.status(HttpStatus.OK).json({
        message: 'Found Inventory',
        inventoryData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/region')
  @ApiBearerAuth()
  @Roles('region-manager', 'admin') // Specify the required roles for this route
  @UseGuards(RolesGuard)
  async getRegionInventory(@Res() response, @Req() request) {
    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const json = this.jwtService.decode(jwt, { json: true });
      // json[""]
      const id = json['userId'];
      const user = await this.userService.getUserById(id);
      const inventoryData = await this.inventoryService.getInventoryByRegion(
        user['region'].toString(),
      );
      return response.status(HttpStatus.OK).json({
        message: 'Found Inventory',
        inventoryData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getInventoryID(@Res() response, @Param('id') inventoryId: string) {
    try {
      const inventoryData = await this.inventoryService.getInventoryById(
        inventoryId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Found Inventory',
        inventoryData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateInventoryDto })
  async updateInventory(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<any> {
    // Logic to update the inventory
    const updatedInventory = await this.inventoryService.updateInventory(
      id,
      updateInventoryDto,
    );
    return updatedInventory;
  }
}
