import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
    loading: false,
    error: "",
    cartList: [],
    selectedItem: {},
    cartItemCount: 0,
    totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk("cart/addToCart", async ({ id, color }, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.post(`/cart`, { productId: id, color, qty: 1 });
        if (response.status === 200) {
            dispatch(showToastMessage({ message: "장바구니에 추가되었습니다.", status: "success" }));
        } else {
            throw new Error("장바구니에 추가에 실패했습니다.");
        }
        return response.data.cartItemQty;
    } catch (error) {
        dispatch(showToastMessage({ message: error.message, status: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const getCartList = createAsyncThunk("cart/getCartList", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.get(`/cart`);
        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error("장바구니 목록 조회에 실패했습니다.");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.delete(`/cart/${id}`);
        if (response.status === 200) {
            dispatch(showToastMessage({ message: "장바구니에서 삭제되었습니다.", status: "success" }));
        } else {
            throw new Error("장바구니에서 삭제에 실패했습니다.");
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateQty = createAsyncThunk("cart/updateQty", async ({ id, value }, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.put(`/cart/${id}`, { qty: value });
        if (response.status === 200) {
            dispatch(showToastMessage({ message: "수량이 변경되었습니다.", status: "success" }));
        } else {
            throw new Error("수량 변경에 실패했습니다.");
        }
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getCartQty = createAsyncThunk("cart/getCartQty", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.get(`/cart/qty`);
        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error("장바구니 수량 조회에 실패했습니다.");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initialCart: (state) => {
            state.cartItemCount = 0;
            state.cartList = [];
            state.totalPrice = 0;
        },
        // You can still add reducers here for non-async actions if necessary
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.cartItemCount = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.cartList = action.payload;
                state.totalPrice = action.payload.reduce((total, item) => total + item.productId.price * item.qty, 0);
            })
            .addCase(getCartList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartQty.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartQty.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.cartItemCount = action.payload;
            })
            .addCase(getCartQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.cartList = action.payload.data;
                state.cartItemCount = action.payload.cartItemQty;
                state.totalPrice = action.payload.data.reduce(
                    (total, item) => total + item.productId.price * item.qty,
                    0
                );
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateQty.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateQty.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.cartList = action.payload;
                state.totalPrice = action.payload.reduce((total, item) => total + item.productId.price * item.qty, 0);
            })
            .addCase(updateQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
