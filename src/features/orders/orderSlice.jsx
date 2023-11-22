import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder } from "./ordersAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
};

export const createOrdersAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const { data } = await createOrder(order);
    return data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
