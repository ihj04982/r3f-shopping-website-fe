import React, { useState } from "react";
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Chip,
    Avatar,
    IconButton,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";

const OrderStatusCard = ({ orderItem }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getTotalQuantity = () => {
        return orderItem.items.reduce((total, item) => total + item.qty, 0);
    };

    return (
        <Card sx={{ marginBottom: 2, boxShadow: 2 }}>
            <CardContent>
                <Box sx={{ cursor: "pointer" }} onClick={handleExpandClick}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, sm: 10, md: 10 }}>
                            <Typography variant="body1">Order # {orderItem.orderNum}</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: { xs: 0.5, sm: 2 },
                                    mt: 1,
                                }}
                            >
                                <Typography variant="body2">수량: {getTotalQuantity()}개</Typography>
                                <Typography variant="body2">날짜: {orderItem.createdAt.slice(0, 10)}</Typography>
                                <Typography variant="body2">Total: ₩{currencyFormat(orderItem.totalPrice)}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1, md: 1 }}>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography
                                    color={
                                        badgeBg[orderItem.status] === "success"
                                            ? "success"
                                            : badgeBg[orderItem.status] === "danger"
                                            ? "error"
                                            : badgeBg[orderItem.status] === "warning"
                                            ? "warning"
                                            : "default"
                                    }
                                    variant="body2"
                                >
                                    {orderItem.status}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 1, md: 1 }}>
                            <Box sx={{ textAlign: "right" }}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleExpandClick();
                                    }}
                                >
                                    {expanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: { xs: "block", md: "none" } }}>
                            {orderItem.items.map((item, index) => (
                                <Card key={index} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid size={{ xs: 4 }}>
                                                <Avatar
                                                    src={item.productId?.image}
                                                    alt={item.productId?.name}
                                                    sx={{ width: 60, height: 60 }}
                                                    variant="rounded"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 8 }}>
                                                <Typography variant="body1">{item.productId?.name}</Typography>
                                                <Typography variant="body2">Color: {item.color || "N/A"}</Typography>
                                                <Typography variant="body2">수량: {item.qty}</Typography>
                                                <Typography variant="body2">
                                                    Total: ₩{currencyFormat(item.productId?.price * item.qty)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        <TableContainer
                            component={Paper}
                            variant="elevation"
                            sx={{ display: { xs: "none", md: "block" } }}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>상품 이미지</TableCell>
                                        <TableCell>상품명</TableCell>
                                        <TableCell align="center">수량</TableCell>
                                        <TableCell align="right">단가</TableCell>
                                        <TableCell align="right">소계</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderItem.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Avatar
                                                    src={item.productId?.image}
                                                    alt={item.productId?.name}
                                                    sx={{ width: 50, height: 50 }}
                                                    variant="rounded"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1">{item.productId?.name}</Typography>
                                                <Typography variant="body2">Color: {item.color || "N/A"}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">{item.qty}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2">
                                                    ₩{currencyFormat(item.productId?.price)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2">
                                                    Total: ₩{currencyFormat(item.productId?.price * item.qty)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <Typography variant="body2">Total: ₩{currencyFormat(orderItem.totalPrice)}</Typography>
                        </Box>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default OrderStatusCard;
