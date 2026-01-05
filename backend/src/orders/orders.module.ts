import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderComment } from './entities/order-comment.entity';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderComment]), GroupsModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
