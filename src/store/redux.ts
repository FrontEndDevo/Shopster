import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categoriesSlice";
import products from "./productsSlice";
import cart from "./cart/cartSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
// 1. Explicitly import WebStorage from redux-persist
import type { WebStorage } from "redux-persist";

// 2. Type your object as WebStorage
const storage: WebStorage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  categories,
  products,
  cart,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
