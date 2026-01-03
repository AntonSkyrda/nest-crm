import type {IOrder} from "./IOrder.ts";

export interface IOrdersResponse {
    orders: IOrder[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}