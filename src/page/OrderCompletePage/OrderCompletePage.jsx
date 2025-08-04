import React from "react";
import { Box, Typography, Button } from "@mui/material";
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
            <Box
                component="img"
                src="/image/greenCheck.png"
                sx={{ width: 100, height: 100, marginBottom: 3 }}
                alt="greenCheck.png"
            />
            <Typography variant="h4" component="h2" sx={{ marginBottom: 2, color: "success.main" }}>
                예약이 완료됬습니다!
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                예약번호:하드코딩
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: "center" }}>
                예약 확인은 내 예약 메뉴에서 확인해주세요
            </Typography>
            <Button component={Link} to="/account" variant="contained" color="primary">
                내 예약 바로가기
            </Button>
        </Box>
    );
};

export default OrderCompletePage;
