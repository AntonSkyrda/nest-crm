import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { fetchOrders } from "../redux/slices/orders.slice";
import {DEFAULT_SORT_BY, DEFAULT_SORT_DIR, type SortDir} from "../constants/orders.ts";

export const useOrders = () => {
    const dispatch = useAppDispatch();
    const { orders, totalPages, loading, error } = useAppSelector(s => s.orders);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const sortBy = searchParams.get("sortBy") || DEFAULT_SORT_BY;
    const sortDir = (searchParams.get("sortDir") as SortDir) || DEFAULT_SORT_DIR;

    useEffect(() => {
        dispatch(fetchOrders({ page, limit: 25, sortBy, sortDir }));
    }, [dispatch, page, sortBy, sortDir]);

    const setPage = (nextPage: number) => {
        setSearchParams(prev => {
            prev.set("page", String(nextPage));
            return prev;
        });
    };

    const toggleSort = (field: string) => {
        setSearchParams(prev => {
            const currentBy = prev.get("sortBy") || DEFAULT_SORT_BY;
            const currentDir = (prev.get("sortDir") as SortDir) || DEFAULT_SORT_DIR;

            const nextDir: SortDir =
                currentBy === field ? (currentDir === "asc" ? "desc" : "asc") : "asc";

            prev.set("sortBy", field);
            prev.set("sortDir", nextDir);
            prev.set("page", "1");
            return prev;
        });
    };

    return {
        orders,
        page,
        totalPages,
        loading,
        error,
        setPage,
        sortBy,
        sortDir,
        toggleSort,
    };
};
