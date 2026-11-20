import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemQuantity, addSubtotal, addToCart, addtotal, clearCart, removeCartItem, setcartItems, subItemQuantity, subtractSubtotal, subtractTotal } from '@/features/Cart/states/cartSlice';
import { addItemQuantityApi, addItemToCartApi, clearCartApi, getCartItemsAPi, migrateGuestCartApi, removeItemApi, subItemQuantityApi } from '@/features/Cart/services/cartApi';

export default function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.User);
  const items = Array.isArray(cartItems) ? cartItems : Array.isArray(cartItems?.items) ? cartItems.items : [];

  const addToCartHandler = useCallback(async (product, variant) => {
    if (!product) return false;

    const variantId = variant?._id || variant?.id || null;
    const variantAttributes = variant?.attribute || variant?.attributes || {};
    const productId = product._id || product.id;
    const variantPrice = variant?.price;
    const unitPrice =
      typeof variantPrice === 'number'
        ? variantPrice
        : typeof variantPrice?.amount === 'number'
          ? variantPrice.amount
          : typeof product.price === 'number'
            ? product.price
            : product.price?.amount || 0;

    if (user) {
      if (!productId) {
        throw new Error('Cannot add cart item without a product ID');
      }

      await addItemToCartApi(productId, variantId);
      const cartResponse = await getCartItemsAPi();
      dispatch(setcartItems(cartResponse));
      return true;
    }

    dispatch(
      addToCart({
        _id: `cart-${productId}-${variantId || 'default'}-${Date.now()}`,
        productId: product,
        variantId,
        variantAttributes,
        quantity: 1,
        unitPrice,
      })
    );
    return true;
  }, [dispatch, user]);

  const getCartItemsHandler = useCallback(async () => {
    if (user) {
      const cartResponse = await getCartItemsAPi();
      dispatch(setcartItems(cartResponse));
      return true;
    }
  }, [dispatch, user]);

  const incrementCartItemHandler = useCallback(async (id) => {
    if (user) {
      if (!id) {
        throw new Error('Cannot increase item quantity without an item ID');
      }

      await addItemQuantityApi(id);
    }

    dispatch(addItemQuantity(id));
    dispatch(addSubtotal(id));
    dispatch(addtotal(id));
  }, [dispatch]);

  const decrementCartItemHandler = useCallback(async (id) => {
    if (user) {
      if (!id) {
        throw new Error('Cannot decrease item quantity without an item ID');
      }

      await subItemQuantityApi(id);
    }

    const target = items.find((item) => item._id === id);
    if (target && target.quantity <= 1) {
      dispatch(removeCartItem(id));
      return true;
    }

    dispatch(subItemQuantity(id));
    dispatch(subtractSubtotal(id));
    dispatch(subtractTotal(id));
    return false;
  }, [dispatch, items]);

  const removeCartItemHandler = useCallback(async (id) => {
    if (user) {
      if (!id) {
        throw new Error('Cannot remove item from cart without an item ID');
      }

      await removeItemApi(id);
    }
    const removedItem = items.find((item) => item._id === id);
    dispatch(removeCartItem(id));
    return removedItem;
  }, [dispatch, items]);

  const clearCartHandler = useCallback(async () => {
    if (user) await clearCartApi();
    dispatch(clearCart());
  }, [dispatch, user]);

  const migrateGuestCartHandler = useCallback(async () => {

    const guestItems = Array.isArray(cartItems)
      ? cartItems : Array.isArray(cartItems?.items)
        ? cartItems.items : [];

    const migrationItems = guestItems.map((item) => {
      const product = item?.productId;
      const productId = typeof product === 'string' ? product : product?._id || product?.id;

      if (!productId) {
        throw new Error('Cannot migrate cart item without a product ID');
      }

      return { productId, variantId: item.variantId, quantity: item.quantity };
    });

    const migrationResponse = await migrateGuestCartApi(migrationItems);
    const cartResponse = await getCartItemsAPi();

    dispatch(setcartItems(cartResponse));

    return migrationResponse;
  }, [cartItems, dispatch]);

  return { addToCartHandler, getCartItemsHandler, incrementCartItemHandler, decrementCartItemHandler, removeCartItemHandler, clearCartHandler, migrateGuestCartHandler };
}
