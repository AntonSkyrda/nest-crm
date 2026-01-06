import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { orderActions } from "../redux/slices/orders.slice";

export const useOrderGroup = () => {
    const dispatch = useAppDispatch();
    const { error, updatingGroup } = useAppSelector((state) => state.orders);

    const setGroup = async (orderId: number, groupId: number) => {
        return  await dispatch(
            orderActions.setOrderGroup({ orderId, groupId })
        ).unwrap();
    };

    return {
        setGroup,
        error,
        updatingGroup,
    };
};
