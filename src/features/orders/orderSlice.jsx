import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder, fetchAllOrders, updateOrder } from "./ordersAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrder: 0,
};

export const createOrdersAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const { data } = await createOrder(order);
    return data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({sort, pagination}) => {
    const { data } = await fetchAllOrders(sort, pagination);
    return data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const { data } = await updateOrder(order);
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
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrder = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders.splice(index, 1, action.payload);
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrder;

export default orderSlice.reducer;
