import { Animated } from "react-native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SwipeBackState {
  translateX: Animated.Value | null;
}

const initialState: SwipeBackState = {
  translateX: null,
};

const swipeBackSlice = createSlice({
  name: "swipeBack",
  initialState,
  reducers: {
    setTranslateX: (state, action: PayloadAction<Animated.Value | null>) => {
      state.translateX = action.payload;
    },
    clearTranslateX: (state) => {
      state.translateX = null;
    },
  },
});

export const { setTranslateX, clearTranslateX } = swipeBackSlice.actions;
export default swipeBackSlice.reducer;

