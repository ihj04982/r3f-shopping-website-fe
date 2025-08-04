import React from "react";
import { Card, CardContent, Grid, Typography, Box, Chip, Avatar } from "@mui/material";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";

const OrderStatusCard = ({ orderItem }) => {
    return (
        <Card sx={{ marginBottom: 2, boxShadow: 2 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 2 }}>
                        <Avatar
                            src={orderItem.items[0]?.productId?.image}
                            alt={orderItem.items[0]?.productId?.image}
                            sx={{ width: 96, height: 96 }}
                            variant="rounded"
                        />
                    </Grid>
                    <Grid size={{ xs: 8 }}>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                                주문번호: {orderItem.orderNum}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                                {orderItem.createdAt.slice(0, 10)}
                            </Typography>

                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                {orderItem.items[0].productId.name}
                                {orderItem.items.length > 1 && `외 ${orderItem.items.length - 1}개`}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                ₩ {currencyFormat(orderItem.totalPrice)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", marginBottom: 1 }}
                            >
                                주문상태
                            </Typography>
                            <Chip
                                label={orderItem.status}
                                color={
                                    badgeBg[orderItem.status] === "success"
                                        ? "success"
                                        : badgeBg[orderItem.status] === "danger"
                                        ? "error"
                                        : badgeBg[orderItem.status] === "warning"
                                        ? "warning"
                                        : "default"
                                }
                                variant="filled"
                                size="small"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderStatusCard;
