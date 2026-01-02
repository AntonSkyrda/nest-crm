import { Order } from '../entities/order.entity';

export class ResponseOrdersModel {
  orders: Order[];
  totalPages: number;
  page: number;
  limit: number;
  total: number;
}
