import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for object detection
interface ObjectDetectionState {
  detections: Record<string, number>; // Object to store names and counts
}

const initialState: ObjectDetectionState = {
  detections: {},
};

// Create a slice for object detection
const objectDetectionSlice = createSlice({
  name: 'objectDetection',
  initialState,
  reducers: {
    incrementCount(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      if (state.detections[itemName]) {
        state.detections[itemName] += 1;
      } else {
        state.detections[itemName] = 1;
      }
    },
    decrementCount(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      if (state.detections[itemName]) {
        state.detections[itemName] -= 1;
        // Optionally, you may want to remove the item if its count reaches zero
        if (state.detections[itemName] === 0) {
          delete state.detections[itemName];
        }
      }
    },
    // You can add more actions as needed, like resetting the detections
    resetDetections(state) {
      state.detections = {};
    },
  },
});

// Export the actions and reducer
export const { incrementCount, decrementCount, resetDetections } = objectDetectionSlice.actions;
export default objectDetectionSlice.reducer;
