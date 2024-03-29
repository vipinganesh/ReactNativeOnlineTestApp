import { QuestionSlice } from "./QuestionTypes";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    question: QuestionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
