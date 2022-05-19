import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers";

export const store = configureStore({
  reducer: RootReducer
});

export type RootStore = ReturnType<typeof RootReducer>
