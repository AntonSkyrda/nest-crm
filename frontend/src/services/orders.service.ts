import type {IOrdersResponse} from "../models/IOrderResponse.ts";
import axios from "axios";
import {urls} from "../constants/ursl.ts";
import {getApiErrorMessage} from "../utils/api-error.ts";

export const ordersService = {
    async getAllOrders(page: number): Promise<IOrdersResponse> {
        try {
            const {data} = await axios.get<IOrdersResponse>(
                urls.orders.allOrders,
                { params: { page } },
            );
            return data
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Failed to get all orders"));
        }
    }
}