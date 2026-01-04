import type { IOrder } from "../models/IOrder.ts";
import { useAppDispatch, useAppSelector } from "./redux-hooks.ts";
import { useMemo, useState } from "react";
import { addOrderComment } from "../redux/slices/orders.slice.ts";

export const useOrderComments = (order: IOrder) => {
    const dispatch = useAppDispatch();

    // user може бути null — це ок
    const currentUserId = useAppSelector(
        state => state.auth.me?.id ?? null
    );

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const canComment = useMemo(() => {
        if (!currentUserId) return false;

        if (!order.manager) return true;

        return order.manager.id === currentUserId;
    }, [order.manager, currentUserId]);

    const toggleOpen = () => {
        setOpen(v => {
            const next = !v;
            if (!next) setText("");
            return next;
        });
    };

    const submit = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        setSending(true);
        try {
            const res = await dispatch(
                addOrderComment({ orderId: order.id, text: trimmed })
            );
            if (res.meta.requestStatus === "fulfilled") setText("");
        } finally {
            setSending(false);
        }
    };

    return {
        open,
        toggleOpen,
        text,
        setText,
        sending,
        canComment,
        submit,
    };
};
