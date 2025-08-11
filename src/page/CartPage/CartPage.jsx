import React from "react";
import { useEffect } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "./component/CartProductCard";
import OrderReceipt from "../PaymentPage/component/OrderReceipt";
import { getCartList } from "../../features/cart/cartSlice";
import LoadingSpinner from "../../common/component/LoadingSpinner";

const CartPage = () => {
    const dispatch = useDispatch();
    const { cartList, totalPrice, loading } = useSelector((state) => state.cart);

    useEffect(() => {
        //카트리스트 불러오기
        dispatch(getCartList());
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid size={{ xs: 12, md: 7 }}>
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                            <LoadingSpinner size={60} message="카트 정보를 불러오는 중..." />
                        </Box>
                    ) : cartList.length > 0 ? (
                        cartList.map((item) => <CartProductCard item={item} key={item._id} />)
                    ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                카트가 비어있습니다.
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                상품을 담아주세요!
                            </Typography>
                        </Box>
                    )}
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;
