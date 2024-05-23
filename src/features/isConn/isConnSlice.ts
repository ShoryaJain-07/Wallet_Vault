import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface isConnState {
  value: boolean;
}

const initialState: isConnState = {
  value: false,
};

export const isConnSlice = createSlice({
  name: "isConn",
  initialState,
  reducers: {
     setIsConn: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsConn } = isConnSlice.actions;

export default isConnSlice.reducer;
