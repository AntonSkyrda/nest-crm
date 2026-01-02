import { Order } from '../enteties/order.entity';

export class ResponseOrdersModel {
  orders: Order[];
  totalPages: number;
  page: number;
  limit: number;
  total: number;
}
