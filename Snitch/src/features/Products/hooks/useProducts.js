import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsApi, getProductApi } from '@/features/Products/services/productApi';
import { adaptProduct } from '@/features/Products/utils/productAdapter';
import {
  productsFetchStarted,
  setAllProducts,
  setProductsError,
  setProduct,
} from '@/features/Products/states/productSlice';

export default function useProducts() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const hasStartedRequest = useRef(false);

  // ── Fetch all products ──────────────────────────────────────────────────────
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

  // ── Fetch a single product by id ────────────────────────────────────────────
  const getProductHandler = useCallback(async (productId) => {
    dispatch(productsFetchStarted());

    try {
      const data = await getProductApi({ productId });
      const raw = data?.product || data;
      const adapted = adaptProduct(raw);
      dispatch(setProduct(adapted));
      return adapted;
    } catch (error) {
      dispatch(
        setProductsError(
          error instanceof Error ? error.message : 'Something went wrong'
        )
      );
      return null;
    }
  }, [dispatch]);

  return { getProductsHandler, getProductHandler };
}
