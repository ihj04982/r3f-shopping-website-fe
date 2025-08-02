import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";

const LandingPage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const [query] = useSearchParams();
  const name = query.get("name");
  useEffect(() => {
    dispatch(
      getProductList({
        name,
      })
    );
  }, [query]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <ProductCard item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4">
                {name === "" ? "등록된 상품이 없습니다!" : `${name}과 일치한 상품이 없습니다!`}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default LandingPage;
