import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postAPI } from "../feature/post";

export const store = configureStore({
  reducer: {
    [postAPI.reducerPath]: postAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postAPI.middleware),
});
setupListeners(store.dispatch);
