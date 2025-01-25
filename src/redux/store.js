// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slice/inventorySlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

export default store;
