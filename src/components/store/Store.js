import {configureStore , createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
name:"images",
initialState:{imageURL:null},
reducers:{
addedImage(state , action){
state.imageURL = action.payload;
}
}
});

const store = configureStore({
   reducer:{
      image:imageSlice.reducer
   }
});

export const imageActions = imageSlice.actions;

export default store;