import type { IOrder } from "../../models/IOrder.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IOrdersResponse } from "../../models/IOrderResponse.ts";
import { ordersService } from "../../services/orders.service.ts";
import type { SortDir } from "../../constants/orders.ts";
import type { IOrderUpdate } from "../../models/IOrderUpdate.ts";

interface OrdersState {
    orders: IOrder[];
    totalPages: number;
    loading: boolean;
    error: string | null;
    updatingGroup: boolean;
    updating: boolean;
}

const initialState: OrdersState = {
    orders: [],
    totalPages: 1,
    loading: false,
    error: null,
    updatingGroup: false,
    updating: false,
};

const sameId = (a: string | number, b: string | number) => Number(a) === Number(b);

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
    { orderId: number; text: string },
    { rejectValue: string }
>("orders/addOrderComment", async ({ orderId, text }, { rejectWithValue }) => {
    try {
        return await ordersService.addOrderComment(orderId, text);
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
});

export const setOrderGroup = createAsyncThunk<
    IOrder,
    { orderId: number; groupId: number },
    { rejectValue: string }
>("orders/setGroup", async ({ orderId, groupId }, { rejectWithValue }) => {
    try {
        return await ordersService.setOrderGroup(orderId, groupId);
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
});

export const updateOrder = createAsyncThunk<
    IOrder,
    { orderId: number; payload: Partial<IOrderUpdate> },
    { rejectValue: string }
>("orders/updateOrder", async ({ orderId, payload }, { rejectWithValue }) => {
    try {
        return await ordersService.updateOrder(orderId, payload);
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
});

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchOrders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalPages = action.payload.totalPages;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load orders";
            })

            // addOrderComment
            .addCase(addOrderComment.fulfilled, (state, action) => {
                const updated = action.payload;
                state.orders = state.orders.map((o) => (sameId(o.id, updated.id) ? updated : o));
                state.error = null;
            })
            .addCase(addOrderComment.rejected, (state, action) => {
                state.error = action.payload ?? "Add comment error";
            })

            // setOrderGroup
            .addCase(setOrderGroup.pending, (state) => {
                state.updatingGroup = true;
                state.error = null;
            })
            .addCase(setOrderGroup.fulfilled, (state, action) => {
                state.updatingGroup = false;

                const updated = action.payload;
                state.orders = state.orders.map((o) => (sameId(o.id, updated.id) ? updated : o));
                state.error = null;
            })
            .addCase(setOrderGroup.rejected, (state, action) => {
                state.updatingGroup = false;
                state.error = String(action.payload ?? "Set group error");
            })

            // updateOrder
            .addCase(updateOrder.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.updating = false;

                const updated = action.payload;
                state.orders = state.orders.map((o) => (sameId(o.id, updated.id) ? updated : o));
                state.error = null;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload ?? "Update order error";
            });
    },
});

const { reducer: orderReducer, actions } = ordersSlice;

const orderActions = {
    ...actions,
    fetchOrders,
    addOrderComment,
    setOrderGroup,
    updateOrder,
};

export { orderReducer, orderActions };
