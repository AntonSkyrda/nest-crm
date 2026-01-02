import type {IOrder} from "../../models/IOrder.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IOrdersResponse} from "../../models/IOrderResponse.ts";
import {ordersService} from "../../services/orders.service.ts";

interface OrdersState {
    orders: IOrder[];
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    totalPages: 1,
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk<
    IOrdersResponse,
    number,
    { rejectValue: string}
>(
    "orders/fetchOrders",
    async (page, {rejectWithValue}) => {
        try {
            return await ordersService.getAllOrders(page);
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue("Error fetching orders");
        }
    }
)

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOrders.pending, state => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load orders"
            });
    },
})

export const orderReducer = ordersSlice.reducer;
