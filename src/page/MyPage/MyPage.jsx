import React from "react";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "./component/OrderStatusCard.jsx";
import { getOrder } from "../../features/order/orderSlice";
import { logout } from "../../features/user/userSlice";

const MyPage = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector((state) => state.order);
    console.log(orderList);

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" size="small" onClick={handleLogout}>
                    로그아웃
                </Button>
            </Box>
            <Box sx={{ padding: 3 }}>
                {orderList.map((item) => (
                    <OrderStatusCard orderItem={item} key={item._id} />
                ))}
            </Box>
            {orderList?.length === 0 && (
                <Box sx={{ padding: 3, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                        진행중인 주문이 없습니다.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MyPage;
