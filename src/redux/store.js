import { configureStore } from "@reduxjs/toolkit";
import userReduser from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";

export default configureStore({
  reducer: {
    user: userReduser,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
