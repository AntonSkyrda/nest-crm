import type { IOrdersResponse } from "../models/IOrderResponse";
import axios from "axios";
import { urls } from "../constants/urls.ts";
import { getApiErrorMessage } from "../utils/api-error";
import type {SortDir} from "../constants/orders.ts";
import type {IOrder} from "../models/IOrder.ts";

export const ordersService = {
    async getAllOrders(params: {
        page: number;
        limit?: number;
        sortBy?: string;
        sortDir?: SortDir;
    }): Promise<IOrdersResponse> {
        try {
            const { data } = await axios.get<IOrdersResponse>(urls.orders.allOrders, {
                params,
            });
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to get orders"));
        }
    },

    async getOrderById(id: number): Promise<IOrder> {
        try {
            const { data } = await axios.get<IOrder>(urls.orders.orderById(id))
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to get order details"));
        }
    }
};
