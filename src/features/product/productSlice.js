import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getProductList = createAsyncThunk("products/getProductList", async (query, { rejectWithValue }) => {
    try {
        const response = await api.get("/product", { params: { ...query } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("상품 목록 조회에 실패했습니다.");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getProductDetail = createAsyncThunk("products/getProductDetail", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/product/${id}`);
        if (response.status === 200) {
            return response.data.product;
        } else {
            throw new Error("상품 상세 조회에 실패했습니다.");
        }
    } catch (error) {
        return rejectWithValue(error.message || "상품 상세 조회 중 오류가 발생했습니다.");
    }
});

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/product", formData);
            if (response.status === 200) {
                dispatch(showToastMessage({ status: "success", message: "상품이 등록되었습니다." }));
                dispatch(getProductList({ page: 1 }));
                return response.data.data;
            } else {
                throw new Error("상품 등록에 실패했습니다.");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.delete(`/product/${id}`);
        if (response.status === 200) {
            dispatch(showToastMessage({ status: "success", message: "상품이 삭제되었습니다." }));
            dispatch(getProductList({ page: 1 }));
            return response.data.data;
        } else {
            throw new Error("상품 삭제에 실패했습니다.");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/product/${id}`, formData);
            if (response.status === 200) {
                dispatch(showToastMessage({ status: "success", message: "상품이 수정되었습니다." }));
                dispatch(getProductList({ page: 1 }));
                return response.data.data;
            } else {
                throw new Error("상품 수정에 실패했습니다.");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 슬라이스 생성
const productSlice = createSlice({
    name: "products",
    initialState: {
        productList: [],
        selectedProduct: null,
        loading: false,
        error: "",
        totalPageNum: 1,
        success: false,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setFilteredList: (state, action) => {
            state.filteredList = action.payload;
        },
        clearError: (state) => {
            state.error = "";
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload.data;
                state.totalPageNum = action.payload.totalPages;
                state.error = "";
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductDetail.pending, (state) => {
                state.loading = true;
                state.selectedProduct = null;
                state.error = "";
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
                state.error = "";
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.selectedProduct = null;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
                state.success = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
                state.success = true;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { setSelectedProduct, setFilteredList, clearError } = productSlice.actions;
export default productSlice.reducer;
