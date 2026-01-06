import type {IOrdersResponse} from "../models/IOrderResponse";
import {urls} from "../constants/urls.ts";
import {getApiErrorMessage} from "../utils/api-error";
import type {SortDir} from "../constants/orders.ts";
import type {IOrder} from "../models/IOrder.ts";
import {apiService} from "./api.service.ts";
import type {IOrderUpdate} from "../models/IOrderUpdate.ts";

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

    async updateOrder(orderId: number, payload: Partial<IOrderUpdate>): Promise<IOrder> {
        try {
            const { data } = await apiService.patch<IOrder>(urls.orders.orderById(orderId), payload);
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to update order"));
        }
    },

    async addOrderComment(orderId: number | string, text: string): Promise<IOrder> {
        try {
            const { data } = await apiService.post<IOrder>(urls.orders.orderComment(orderId), {text})
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to add comment"));
        }
    },

    async setOrderGroup(orderId: number, groupId: number ): Promise<IOrder> {
        try {
            const { data } = await apiService.patch<IOrder>(urls.orders.orderGroup(orderId), {groupId: Number(groupId)})
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to update order group"));
        }
    }
};
