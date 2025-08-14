import React from "react";
import {
    Box,
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderCompletePage = () => {
    const { orderNum } = useSelector((state) => state.order);

    if (orderNum === "")
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    padding: 3,
                }}
            >
                <Typography variant="h4" component="h1" sx={{ marginBottom: 3, color: "error.main" }}>
                    주문 실패
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    메인페이지로 돌아가세요
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    메인페이지로 돌아가기
                </Button>
            </Box>
        );
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                padding: 3,
            }}
        >
            <Typography variant="h4" component="h2" sx={{ marginBottom: 2, color: "primary" }}>
                고객님, 주문이 완료되었습니다.
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                주문 번호: {orderNum}
            </Typography>
            <Button component={Link} to="/account" variant="contained" color="primary">
                주문 상세 내역
            </Button>
        </Box>
    );
};

export default OrderCompletePage;
