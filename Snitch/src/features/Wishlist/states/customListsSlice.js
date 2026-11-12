import { createSlice } from '@reduxjs/toolkit';

const getItemId = (item) => {
  if (item == null) return null;
  const id = typeof item === 'object' ? item.id ?? item._id : item;
  return id == null ? null : String(id);
};

const customListsSlice = createSlice({
  name: 'customLists',
  initialState: {
    lists: [],
    // lists: [{ id: string, name: string, itemIds: string[] }]
  },
  reducers: {
    createCustomList: (state, action) => {
      const { id, name } = action.payload;
      if (!id || !name) return;
      const exists = state.lists.some((l) => l.id === id);
      if (!exists) state.lists.push({ id, name, itemIds: [] });
    },
    renameCustomList: (state, action) => {
      const { id, name } = action.payload;
      const list = state.lists.find((l) => l.id === id);
      if (list && name) list.name = name;
    },
    deleteCustomList: (state, action) => {
      const id = action.payload;
      state.lists = state.lists.filter((l) => l.id !== id);
    },
    addItemToList: (state, action) => {
      const { listId, item } = action.payload;
      const itemId = getItemId(item);
      if (!listId || !itemId) return;
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return;
      if (!list.itemIds.includes(itemId)) list.itemIds.push(itemId);
    },
    removeItemFromList: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) list.itemIds = list.itemIds.filter((id) => id !== String(itemId));
    },
  },
});

export const {
  createCustomList,
  renameCustomList,
  deleteCustomList,
  addItemToList,
  removeItemFromList,
} = customListsSlice.actions;

export default customListsSlice.reducer;

