import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsApi } from '@/features/Products/services/productApi';
import { adaptProduct } from '@/features/Products/utils/productAdapter';
import { productsFetchStarted, setAllProducts, setProductsError, } from '@/features/Products/states/productSlice';

export default function useProducts() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const hasStartedRequest = useRef(false);

  const getProductsHandler = useCallback(async () => {
    if (status !== 'idle' || hasStartedRequest.current) {
      return;
    }

    hasStartedRequest.current = true;
    dispatch(productsFetchStarted());

    try {
      const products = await getProductsApi();
      
      dispatch(setAllProducts(products.map(adaptProduct)));
    } catch (error) {
      dispatch(
        setProductsError(
          error instanceof Error ? error.message : 'Something went wrong'
        )
      );
    }
  }, [dispatch, status]);

  return { getProductsHandler };
}
