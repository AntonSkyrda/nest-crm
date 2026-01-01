import {useAppDispatch, useAppSelector} from "./redux-hooks.ts";
import {authService} from "../services/auth.service.ts";
import {useEffect} from "react";
import {authActions} from "../redux/slices/auth.slice.ts";

export const useAuthGuard = () => {
   const dispatch = useAppDispatch();
   const me = useAppSelector((state) => state.auth.me);

   const hasToken = Boolean(authService.getAccessToken())

    useEffect(() => {
        if (hasToken && !me) {
            dispatch(authActions.me())
        }
    }, [dispatch, hasToken, me])

    return {
        isAuthenticated: hasToken,
        me,
    }
}