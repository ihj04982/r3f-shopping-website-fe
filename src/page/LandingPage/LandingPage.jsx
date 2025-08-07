import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import SearchBox from "../../common/component/SearchBox";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.product.productList);
    const [query] = useSearchParams();
    const name = query.get("name");
    const [searchQuery, setSearchQuery] = useState({
        name: name || "",
    });

    useEffect(() => {
        dispatch(
            getProductList({
                name,
            })
        );
    }, [query]);

    useEffect(() => {
        if (searchQuery.name === "") {
            delete searchQuery.name;
        }
        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();
        navigate(`?${queryString}`);
    }, [searchQuery]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}>
                <SearchBox
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="제품 이름으로 검색"
                    field="name"
                />
            </Box>
            <Grid container spacing={3}>
                {productList.length > 0 ? (
                    productList.map((item) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item._id}>
                            <ProductCard item={item} />
                        </Grid>
                    ))
                ) : (
                    <Grid size={{ xs: 12 }}>
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
