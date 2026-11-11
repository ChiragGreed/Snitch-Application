import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishListItem, removeWishListItem } from '@/features/Wishlist/states/wishListSlice';

const getItemId = (item) => {
    if (item == null) return null;
    const id = typeof item === 'object' ? item.id ?? item._id : item;
    return id == null ? null : String(id);
};

const useWishList = () => {
    const dispatch = useDispatch();
    const wishListItems = useSelector((state) => state.wishList.wishListItems);
    const items = Array.isArray(wishListItems) ? wishListItems : [];

    const addToListHandler = useCallback((product) => {
        if (getItemId(product) == null) return;
        dispatch(addWishListItem(product));
    }, [dispatch]);

    const removeFromListHandler = useCallback((productOrId) => {
        const id = getItemId(productOrId);
        if (id == null) return;
        dispatch(removeWishListItem(id));
    }, [dispatch]);

    const isInList = useCallback((productOrId) => {
        const id = getItemId(productOrId);
        return id != null && items.some((item) => getItemId(item) === id);
    }, [items]);

    const toggleListHandler = useCallback((product) => {
        const id = getItemId(product);
        if (id == null) return false;

        if (items.some((item) => getItemId(item) === id)) {
            dispatch(removeWishListItem(id));
            return false;
        }

        dispatch(addWishListItem(product));
        return true;
    }, [dispatch, items]);

    return {
        wishListItems: items,
        addToListHandler,
        removeFromListHandler,
        isInList,
        toggleListHandler,
    };
}

export default useWishList;