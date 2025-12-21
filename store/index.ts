import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./slices/userSlice";
import swipeBackReducer from "./slices/swipeBackSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"], // persist the appSetting slice
};

const rootReducer = combineReducers({
  user: userReducer,
  swipeBack: swipeBackReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
