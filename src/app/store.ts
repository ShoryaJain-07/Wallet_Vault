import { configureStore } from "@reduxjs/toolkit";
import isConnReducer from "../features/isConn/isConnSlice";
import sessionReducer from "../features/session/sessionSlice";

export const store = configureStore({
  reducer: {
    isConn: isConnReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
