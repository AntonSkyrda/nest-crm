import type {IOrder} from "../../models/IOrder.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IOrdersResponse} from "../../models/IOrderResponse.ts";
import {ordersService} from "../../services/orders.service.ts";
import type {SortDir} from "../../constants/orders.ts";

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
    { page: number; limit?: number; sortBy?: string; sortDir?: SortDir },
    { rejectValue: string }
>("orders/fetchOrders", async (args, { rejectWithValue }) => {
    try {
        return await ordersService.getAllOrders(args);
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
});

export const addOrderComment = createAsyncThunk<
    IOrder,
    {orderId: number; text: string},
    { rejectValue: string }
>(
    "orders/addOrderComment",
    async ({orderId, text}, {rejectWithValue}) => {
        try {
            return await ordersService.addOrderComment(orderId, text);
        } catch (e) {
            return rejectWithValue((e as Error).message);
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
            })
            .addCase(addOrderComment.fulfilled, (state, action) => {
                const updated = action.payload;
                const idx = state.orders.findIndex(order => order.id === updated.id);
                if (idx !== -1) state.orders[idx] = updated;
            })
    },
})

export const orderReducer = ordersSlice.reducer;
