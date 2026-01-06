import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { groupsActions } from "../redux/slices/groups.slice";

export const useGroups = (autoload = true) => {
    const dispatch = useAppDispatch();
    const { groups, error } = useAppSelector((state) => state.groups);

    useEffect(() => {
        if (!autoload) return;
        dispatch(groupsActions.fetchGroups());
    }, [autoload, dispatch]);

    const sortedGroups = useMemo(() => {
        return [...groups].sort((a, b) => a.name.localeCompare(b.name));
    }, [groups]);

    const refresh = useCallback(() => {
        dispatch(groupsActions.fetchGroups());
    }, [dispatch]);

    const createGroup = useCallback(
        async (name: string) => {
            return await dispatch(groupsActions.createGroup({ name })).unwrap();
        },
        [dispatch]
    );

    return {
        groups: sortedGroups,
        error,
        refresh,
        createGroup,
    };
};
