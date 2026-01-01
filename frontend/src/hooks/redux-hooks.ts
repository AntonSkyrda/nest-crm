import type {AppDispatch, RootState} from "../redux/store.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();