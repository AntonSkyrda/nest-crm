import {useAppDispatch, useAppSelector} from "./redux-hooks.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchOrders} from "../redux/slices/orders.slice.ts";

export const useOrders = () => {
    const dispatch = useAppDispatch();
    const { orders, totalPages, loading, error } = useAppSelector(
        state => state.orders
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get("page")) || 1)

    useEffect(() => {
        dispatch(fetchOrders(page));
    }, [dispatch, page]);

    const setPage = (nextPage: number) => {
        setSearchParams(prev => {
            prev.set("page", String(nextPage))
            return prev
        })
    };

    return {
        orders,
        page,
        totalPages,
        loading,
        error,
        setPage,
    }
}