import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import SearchBox from "../../common/component/SearchBox";
import LoadingSpinner from "../../common/component/LoadingSpinner";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productList, loading } = useSelector((state) => state.product);
    const [query] = useSearchParams();
    const name = query.get("name");
    const category = query.get("category");
    const [searchQuery, setSearchQuery] = useState({
        name: name || "",
    });

    useEffect(() => {
        dispatch(
            getProductList({
                name,
                category,
            })
        );
    }, [dispatch, name, category]);

    useEffect(() => {
        const params = new URLSearchParams();

        // 카테고리가 있으면 유지
        if (category) {
            params.set("category", category);
        }

        // 검색어가 있으면 추가
        if (searchQuery.name && searchQuery.name !== "") {
            params.set("name", searchQuery.name);
        }

        const queryString = params.toString();
        navigate(`?${queryString}`);
    }, [searchQuery, category, navigate]);

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

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <LoadingSpinner size={60} message="상품을 불러오는 중..." />
                </Box>
            ) : (
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
                                <Typography variant="h5">
                                    {!name && !category
                                        ? "등록된 상품이 없습니다!"
                                        : category && !name
                                        ? `${category} 카테고리에 등록된 상품이 없습니다!`
                                        : name && !category
                                        ? `${name}과 일치한 상품이 없습니다!`
                                        : `${category} 카테고리에서 ${name}과 일치한 상품이 없습니다!`}
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default LandingPage;
