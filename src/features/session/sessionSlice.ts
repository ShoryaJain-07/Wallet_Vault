import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface sessionState {
  value: boolean;
}

const initialState: sessionState = {
  value: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
