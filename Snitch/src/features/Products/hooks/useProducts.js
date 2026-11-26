import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategoriesApi, getProductsApi, getProductApi } from '@/features/Products/services/productApi';
import { adaptProduct } from '@/features/Products/utils/productAdapter';
import {
  categoriesFetchFailed,
  categoriesFetchStarted,
  categoriesFetchSucceeded,
  productDetailFetchFailed,
  productDetailFetchStarted,
  productDetailFetchSucceeded,
  productsFetchStarted,
  setAllProducts,
  setProductsError,
} from '@/features/Products/states/productSlice';

let productRequestSequence = 0;
const createRequestId = () => `${Date.now()}-${++productRequestSequence}`;

export default function useProducts() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.products.status);
  const categoriesStatus = useSelector((state) => state.products.categoriesStatus);
  const hasStartedRequest = useRef(false);

  // Fetch all products
  const getProductsHandler = useCallback(async (force = false) => {
    if (hasStartedRequest.current) return;
    if (status === 'loading') return;
    if (!force && status !== 'idle') return;

    hasStartedRequest.current = true;
    const requestId = createRequestId();
    dispatch(productsFetchStarted(requestId));

    try {
      const products = await getProductsApi();
      dispatch(setAllProducts({
        requestId,
        products: products.map(adaptProduct),
      }));
      return true;
    } catch {
      dispatch(setProductsError({
        requestId,
        error: 'Unable to load products. Please try again.',
      }));
      return false;
    } finally {
      hasStartedRequest.current = false;
    }
  }, [dispatch, status]);

  const getCategoriesHandler = useCallback(async (force = false) => {
    if (categoriesStatus === 'loading') return false;
    if (!force && categoriesStatus !== 'idle') return categoriesStatus === 'succeeded';

    const requestId = createRequestId();
    dispatch(categoriesFetchStarted(requestId));

    try {
      const categories = await getCategoriesApi();
      dispatch(categoriesFetchSucceeded({
        requestId,
        categories: Array.isArray(categories) ? categories : [],
      }));
      return true;
    } catch {
      dispatch(categoriesFetchFailed({
        requestId,
        error: 'Unable to load categories. Please try again.',
      }));
      return false;
    }
  }, [categoriesStatus, dispatch]);

  const getProductHandler = useCallback(async (productId) => {
    const requestId = createRequestId();
    dispatch(productDetailFetchStarted({ productId, requestId }));

    try {
      const data = await getProductApi({ productId });
      const raw = data?.product || data;
      const adapted = adaptProduct(raw);

      dispatch(productDetailFetchSucceeded({ requestId, product: adapted }));

      return adapted;
    } catch {
      dispatch(productDetailFetchFailed({
        requestId,
        error: 'Unable to load this product. Please try again.',
      }));
      return null;
    }
  }, [dispatch]);

  return { getProductsHandler, getCategoriesHandler, getProductHandler };
}
