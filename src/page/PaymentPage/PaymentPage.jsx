import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Button, Typography, Box, FormControl, FormLabel } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import "./style/paymentPage.style.css";
import { createOrder } from "../../features/order/orderSlice";

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { orderNum } = useSelector((state) => state.order);
    const [cardValue, setCardValue] = useState({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    });
    const navigate = useNavigate();
    const [shipInfo, setShipInfo] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        address: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        // 오더번호를 받으면 어디로 갈까?
    }, [orderNum]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // 오더 생성하기
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setShipInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentInfoChange = (event) => {
        const { name, value } = event.target;
        setCardValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInputFocus = (e) => {
        setCardValue({ ...cardValue, focus: e.target.name });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item size={{ xs: 12, lg: 7 }}>
                    <Box>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                            배송 주소
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="성"
                                        name="lastName"
                                        value={shipInfo.lastName}
                                        onChange={handleFormChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="이름"
                                        name="firstName"
                                        value={shipInfo.firstName}
                                        onChange={handleFormChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                fullWidth
                                label="연락처"
                                placeholder="010-xxx-xxxxx"
                                name="contact"
                                value={shipInfo.contact}
                                onChange={handleFormChange}
                                required
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                label="주소"
                                placeholder="Apartment, studio, or floor"
                                name="address"
                                value={shipInfo.address}
                                onChange={handleFormChange}
                                required
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />

                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        value={shipInfo.city}
                                        onChange={handleFormChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Zip"
                                        name="zip"
                                        value={shipInfo.zip}
                                        onChange={handleFormChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: { xs: "block", lg: "none" }, mb: 3 }}>
                                <OrderReceipt />
                            </Box>

                            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                                결제 정보
                            </Typography>

                            <PaymentForm
                                cardValue={cardValue}
                                handlePaymentInfoChange={handlePaymentInfoChange}
                                handleInputFocus={handleInputFocus}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                결제하기
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item size={{ xs: 12, lg: 5 }}>
                    <Box sx={{ display: { xs: "none", lg: "block" } }}>
                        <OrderReceipt />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PaymentPage;
