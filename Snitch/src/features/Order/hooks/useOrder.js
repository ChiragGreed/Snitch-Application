import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createOrderApi, getOrderApi } from "../services/orderApi"
import { setOrderDets } from "../states/orderSlice";

const useOrder = () => {


    const dispatch = useDispatch();

    const createOrderHandler = useCallback(async (cartId) => {
        const res = await createOrderApi(cartId);
        dispatch(setOrderDets(res.order));
        return res.order;
    }, [dispatch]);

    const getOrderHandler = useCallback(async () => {
        const res = await getOrderApi();
        dispatch(setOrderDets(res.order));
        return res;
    }, [dispatch]);


    return { createOrderHandler, getOrderHandler }
}

export default useOrder;