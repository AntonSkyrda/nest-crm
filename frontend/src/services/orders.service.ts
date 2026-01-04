import type {IOrdersResponse} from "../models/IOrderResponse";
import {urls} from "../constants/urls.ts";
import {getApiErrorMessage} from "../utils/api-error";
import type {SortDir} from "../constants/orders.ts";
import type {IOrder} from "../models/IOrder.ts";
import {apiService} from "./api.service.ts";

export const ordersService = {
    async getAllOrders(params: {
        page: number;
        limit?: number;
        sortBy?: string;
        sortDir?: SortDir;
    }): Promise<IOrdersResponse> {
        try {
            const { data } = await apiService.get<IOrdersResponse>(urls.orders.allOrders, {
                params,
            });
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to get orders"));
        }
    },

    async addOrderComment(orderId: number | string, text: string): Promise<IOrder> {
        try {
            const  { data } = await apiService.post<IOrder>(urls.orders.orderComment(orderId), {text})
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to add comment"));
        }
    }
};
