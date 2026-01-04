import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseOrdersModel } from './models/response-orders.model';
import { OrderErrorEnum } from '../enums/order-error.enum';
import { ALLOWED_SORT_FIELDS } from './constants/order.constants';
import type { SortBy, SortDir } from './types/sort.types';
import { OrdersQueryDto } from './dto/orders-query.dto';
import { OrderComment } from './entities/order-comment.entity';
import { OrderStatusEnum } from '../enums/order-status.enum';
import { User } from '../auth/enteties/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderComment)
    private readonly orderCommentRepository: Repository<OrderComment>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  async findAll(query: OrdersQueryDto): Promise<ResponseOrdersModel> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 25;

    const sortBy = query.sortBy;
    const sortDir = query.sortDir;

    const safePage = Math.max(1, Number(page) || 1);

    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 25)); // optional

    const safeSortBy: SortBy = ALLOWED_SORT_FIELDS.includes(sortBy as SortBy)
      ? (sortBy as SortBy)
      : 'created_at';

    const safeSortDir: SortDir = sortDir === 'asc' ? 'asc' : 'desc';

    const [orders, total] = await this.orderRepository.findAndCount({
      take: safeLimit,
      skip: (safePage - 1) * safeLimit,
      order: { [safeSortBy]: safeSortDir.toUpperCase() as 'ASC' | 'DESC' },
      relations: { manager: true, group: true },
    });

    return {
      orders,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
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

  async addComment(orderId: number, text: string, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { comments: true },
    });

    if (!order)
      throw new NotFoundException({ errorCode: OrderErrorEnum.OrderNotFound });

    if (order.managerId && order.managerId !== user.id) {
      throw new ForbiddenException('Order is taken by another manager');
    }

    if (order.status === null || order.status === OrderStatusEnum.NEW) {
      order.status = OrderStatusEnum.IN_WORK;
    }
    order.managerId = user.id;

    const comment = this.orderCommentRepository.create({
      text,
      authorLastName: user.lastName,
      order,
      orderId: order.id,
    });

    await this.orderCommentRepository.save(comment);

    await this.orderRepository.save(order);

    return this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: { comments: true },
    });
  }
}
