import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { orderActions } from "../redux/slices/orders.slice";
import type { IOrderUpdate } from "../models/IOrderUpdate";
import type { IOrder } from "../models/IOrder";
import { buildPatch } from "../utils/buildPatch";

export const useOrderUpdate = () => {
    const dispatch = useAppDispatch();
    const { updating, error } = useAppSelector((s) => s.orders);

    const updateOrder = useCallback(
        async (orderId: number, patch: IOrderUpdate): Promise<IOrder> => {
            const payload = buildPatch(patch);

            return await dispatch(
                orderActions.updateOrder({
                    orderId,
                    payload,
                })
            ).unwrap();
        },
        [dispatch]
    );

    return {
        updateOrder,
        updating,
        error,
    };
};
