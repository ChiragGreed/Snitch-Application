import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsApi, getProductApi } from '@/features/Products/services/productApi';
import { adaptProduct } from '@/features/Products/utils/productAdapter';
import { productsFetchStarted, setAllProducts, setProductsError, setProduct } from '@/features/Products/states/productSlice';

export default function useProducts() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.products.status);
  const hasStartedRequest = useRef(false);

  // Fetch all products
  const getProductsHandler = useCallback(async (force = false) => {
    if (hasStartedRequest.current) return;
    if (status === 'loading') return;
    if (!force && status !== 'idle') return;

    hasStartedRequest.current = true;
    dispatch(productsFetchStarted());

    try {
      const products = await getProductsApi();
      dispatch(setAllProducts(products.map(adaptProduct)));
    } catch (error) {
      dispatch(setProductsError(error instanceof Error ? error.message : 'Something went wrong'));
    } finally {
      hasStartedRequest.current = false;
    }
  }, [dispatch, status]);

  // Fetch a single product without changing the list-fetch status
  const getProductHandler = useCallback(async (productId) => {
    try {
      const data = await getProductApi({ productId });
      const raw = data?.product || data;
      const adapted = adaptProduct(raw);

      dispatch(setProduct(adapted));

      return adapted;
    } catch (error) {
      console.error('Get single product failed:', error);
      return null;
    }
  }, [dispatch]);

  return { getProductsHandler, getProductHandler, };
}
