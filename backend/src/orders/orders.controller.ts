import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './enteties/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseOrdersModel } from './models/response-orders.model';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ResponseOrdersModel> {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.ordersService.delete(id);
  }
}
