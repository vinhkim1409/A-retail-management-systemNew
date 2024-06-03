import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authBusinessReducer from "./authBusinessSlice";
import authCustomerReducer from "./authCustomerSilde";
import authAdminReducer from "./authAdminSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  authBusiness: authBusinessReducer,
  authCustomer: authCustomerReducer,
  authAdmin:authAdminReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer); 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);