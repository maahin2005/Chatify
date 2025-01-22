import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "../features/receiver/receiverSlice";
import profileReducer from "../features/profile/profileSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      receiver:receiverReducer,
      myProfile:profileReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
