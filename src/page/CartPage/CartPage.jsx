import React from "react";
import { useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "./component/CartProductCard";
import OrderReceipt from "../PaymentPage/component/OrderReceipt";
import { getCartList } from "../../features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    //카트리스트 불러오기
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {cartList.length > 0 ? (
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
        <Grid item xs={12} md={5}>
          <OrderReceipt />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
