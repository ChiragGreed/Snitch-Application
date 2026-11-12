import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCustomList,
  deleteCustomList,
  addItemToList,
  removeItemFromList,
  renameCustomList,
} from '@/features/Wishlist/states/customListsSlice';

const getItemId = (item) => {
  if (item == null) return null;
  const id = typeof item === 'object' ? item.id ?? item._id : item;
  return id == null ? null : String(id);
};

const useCustomLists = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.customLists?.lists ?? []);

  const createList = useCallback(
    (name) => {
      if (!name?.trim()) return null;
      const id = `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      dispatch(createCustomList({ id, name: name.trim() }));
      return id;
    },
    [dispatch]
  );

  const deleteList = useCallback(
    (listId) => {
      dispatch(deleteCustomList(listId));
    },
    [dispatch]
  );

  const renameList = useCallback(
    (listId, name) => {
      dispatch(renameCustomList({ id: listId, name }));
    },
    [dispatch]
  );

  const addItem = useCallback(
    (listId, item) => {
      dispatch(addItemToList({ listId, item }));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (listId, itemId) => {
      dispatch(removeItemFromList({ listId, itemId: String(itemId) }));
    },
    [dispatch]
  );

  const isItemInList = useCallback(
    (listId, itemOrId) => {
      const itemId = getItemId(itemOrId);
      if (!itemId) return false;
      const list = lists.find((l) => l.id === listId);
      return list ? list.itemIds.includes(itemId) : false;
    },
    [lists]
  );

  const getListItems = useCallback(
    (listId, allWishlistItems) => {
      const list = lists.find((l) => l.id === listId);
      if (!list) return [];
      return allWishlistItems.filter((item) =>
        list.itemIds.includes(getItemId(item))
      );
    },
    [lists]
  );

  return {
    lists,
    createList,
    deleteList,
    renameList,
    addItem,
    removeItem,
    isItemInList,
    getListItems,
  };
};

export default useCustomLists;

