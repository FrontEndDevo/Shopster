import { configureStore } from "@reduxjs/toolkit";
import categories from "./categoriesSlice";
import products from "./productsSlice";
const store = configureStore({
  reducer: {
    categories,
    products,
  },
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
