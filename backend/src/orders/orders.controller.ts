import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseOrdersModel } from './models/response-orders.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersQueryDto } from './dto/orders-query.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() query: OrdersQueryDto): Promise<ResponseOrdersModel> {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.ordersService.delete(id);
  }
}
