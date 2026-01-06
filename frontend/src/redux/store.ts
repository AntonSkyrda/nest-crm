import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.slice.ts";
import {orderReducer} from "./slices/orders.slice.ts";
import {groupsReducer} from "./slices/groups.slice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        groups: groupsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;