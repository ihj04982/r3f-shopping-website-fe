import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// Define initial state
const initialState = {
    orderList: [],
    orderNum: "",
    selectedOrder: null,
    error: "",
    loading: false,
    totalPageNum: 1,
    success: false,
};

// Async thunks
export const createOrder = createAsyncThunk("order/createOrder", async (payload, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/order", payload);
        if (response.status === 200) {
            dispatch(showToastMessage({ status: "success", message: "주문이 완료되었습니다." }));
        } else {
            throw new Error("주문이 실패했습니다.");
        }
        dispatch(getCartQty());
        return response.data.orderNum;
    } catch (error) {
        dispatch(showToastMessage({ status: "error", message: error.message }));
        return rejectWithValue(error.message);
    }
});

export const getOrder = createAsyncThunk("order/getOrder", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.get("/order/me");
        return response.data.data;
    } catch (error) {
        dispatch(showToastMessage({ status: "error", message: error.message }));
        return rejectWithValue(error.message);
    }
});

export const getOrderList = createAsyncThunk("order/getOrderList", async (query, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.get("/order", { params: { ...query } });
        return response.data;
    } catch (error) {
        dispatch(showToastMessage({ status: "error", message: error.message }));
        return rejectWithValue(error.message);
    }
});

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async ({ id, status }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/order/${id}`, { status });
            if (response.status === 200) {
                dispatch(showToastMessage({ status: "success", message: "주문 상태가 업데이트되었습니다." }));
                dispatch(getOrderList({ page: 1 }));
                return response.data.order;
            } else {
                throw new Error("주문 상태 업데이트에 실패했습니다.");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        clearError: (state) => {
            state.error = "";
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.orderNum = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.orderNum = "";
                state.error = action.payload;
            })
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.orderList = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.orderList = action.payload.data;
                state.totalPageNum = action.payload.totalPages || 1;
            })
            .addCase(getOrderList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrder.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
                state.success = true;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
