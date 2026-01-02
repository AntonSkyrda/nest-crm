import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseOrdersModel } from './models/response-orders.model';
import { OrderErrorEnum } from '../enums/order-error.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
  }): Promise<ResponseOrdersModel> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 25;

    const [orders, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

    return {
      orders,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException({
        errorCode: OrderErrorEnum.OrderNotFound,
      });
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const result = await this.orderRepository.update(id, updateOrderDto);

    if (!result.affected) {
      throw new NotFoundException({
        errorCode: OrderErrorEnum.OrderNotFound,
      });
    }
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.orderRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException({
        errorCode: OrderErrorEnum.OrderNotFound,
      });
    }
  }
}
