import React from "react";
import { Button, Box, Typography, List, ListItem, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const OrderReceipt = ({ cartList, totalPrice }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                border: 1,
                borderColor: "divider",
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                주문 내역
            </Typography>
            <List>
                {cartList.length > 0 &&
                    cartList.map((item) => (
                        <ListItem key={item._id}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="body2">{item.productId.name}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                    ₩{currencyFormat(item.productId.price * item.qty)}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    총계
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ₩{currencyFormat(totalPrice)}
                </Typography>
            </Box>

            {location.pathname.includes("/cart") && (
                <Box>
                    <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={() => navigate("/payment")}>
                        결제 계속하기
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={() => navigate("/")}>
                        쇼핑 계속하기
                    </Button>
                </Box>
            )}

            <Box
                sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "grey.200",
                }}
            >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는 확인되지 않습니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금 읽어보기 반품 및 환불
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderReceipt;
