import { combineReducers } from "@reduxjs/toolkit";
import objectDetectionReducer from "./objectDetectionSlice";

// Combine all reducers
const rootReducer = combineReducers({
  objectDetection: objectDetectionReducer,
  // Add more reducers here if you have them
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
