import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly authService: AuthService,
  ) {}
  //create transaction
  @Post()
  @ApiBody({ type: CreateTransactionDto })
  async createTransaction(
    @Res() response,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    try {
      const newTransaction = await this.transactionService.create(
        createTransactionDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'transaction has been created successfully',
        newTransaction,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: transaction not created!',
        error: err,
      });
    }
  }
  //delete transaction
  @Delete('/:id')
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  async deleteTransaction(@Res() response, @Param('id') transactionId: string) {
    try {
      const deletedTransaction =
        await this.transactionService.deleteTransaction(transactionId);
      return response.status(HttpStatus.OK).json({
        message: 'Transaction deleted successfully',
        deletedTransaction,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //get all transactionsroute
  @Get('/all')
  @Roles('admin', 'accountant') // Specify the required roles for this route
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  async getAll(@Res() response) {
    try {
      const transactionData =
        await this.transactionService.getAllTransactions();
      return response.status(HttpStatus.OK).json({
        message: 'All Transaction data found successfully',
        transactionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  @Roles('admin', 'shed-manager') // Specify the required roles for this route
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  async getTransactionID(@Res() response, @Param('id') transactionId: string) {
    try {
      const transactionData = await this.transactionService.getTransactionById(
        transactionId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Found Transaction',
        transactionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Put(':id')
  @ApiBody({ type: UpdateTransactionDto })
  @ApiBearerAuth()
  @Roles('admin')
  @ApiBearerAuth()
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<any> {
    // Logic to update the transaction
    const updatedTransaction = await this.transactionService.updateTransaction(
      id,
      updateTransactionDto,
    );
    return updatedTransaction;
  }
}
