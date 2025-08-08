import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../utils/number";
import { getProductDetail } from "../../features/product/productSlice";
import LoadingSpinner from "../../common/component/LoadingSpinner";
import {
    Container,
    Grid,
    Button,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Typography,
    Box,
    Alert,
} from "@mui/material";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { selectedProduct, loading } = useSelector((state) => state.product);
    const [color, setColor] = useState("");
    const { id } = useParams();
    const [colorError, setColorError] = useState(false);

    const addItemToCart = () => {
        //사이즈를 아직 선택안했다면 에러
        // 아직 로그인을 안한유저라면 로그인페이지로
        // 카트에 아이템 추가하기
    };

    const selectSize = (value) => {
        setColor(value);
        setColorError(false);
    };

    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [id, dispatch]);

    if (loading || !selectedProduct) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <LoadingSpinner size={60} message="상품 정보를 불러오는 중..." />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <img
                        src={selectedProduct.image}
                        style={{ width: "100%", height: "auto" }}
                        alt={selectedProduct.name}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="h4" component="h1">
                            {selectedProduct.name}
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                            ₩ {currencyFormat(selectedProduct.price)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {selectedProduct.description}
                        </Typography>

                        <FormControl fullWidth error={colorError}>
                            <FormLabel>색상 선택</FormLabel>
                            <Select
                                value={color}
                                onChange={(event) => selectSize(event.target.value)}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    색상 선택
                                </MenuItem>
                                {Object.keys(selectedProduct.stock).length > 0 &&
                                    Object.keys(selectedProduct.stock).map((item, index) => (
                                        <MenuItem key={index} value={item} disabled={selectedProduct.stock[item] <= 0}>
                                            {item.toUpperCase()}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        {colorError && <Alert severity="error">색상을 선택해주세요.</Alert>}

                        <Button
                            variant="contained"
                            size="large"
                            disabled={color === ""}
                            onClick={addItemToCart}
                            sx={{ mt: 2, width: "100%" }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
