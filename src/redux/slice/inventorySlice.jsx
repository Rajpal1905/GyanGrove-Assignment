import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, name: "Item A", category: "Electronics", quantity: 5 },
    { id: 2, name: "Item B", category: "Groceries", quantity: 20 },
    { id: 3, name: "Item C", category: "Clothing", quantity: 8 },
    { id: 4, name: "Item D", category: "Sports", quantity: 18 },
    { id: 5, name: "Item E", category: "Home", quantity: 28 },
    { id: 6, name: "Item F", category: "Beauty&Health", quantity: 8 },
    { id: 7, name: "Item G", category: "Car&Bikes", quantity: 1 },
    { id: 8, name: "Item H", category: "Games", quantity: 11 },
    { id: 9, name: "Item I", category: "Books", quantity: 5 },
  ],
  filter: "",
  sort: "asc", 
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    editItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) state.items[index] = updatedItem;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { addItem, editItem, deleteItem, setFilter, setSort } = inventorySlice.actions;
export default inventorySlice.reducer;
