import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Typography,
    Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../constants/order.constants.js";
import { currencyFormat } from "../../../utils/number";
import { updateOrder } from "../../../features/order/orderSlice";

const OrderDetailDialog = ({ open, handleClose }) => {
    const selectedOrder = useSelector((state) => state.order.selectedOrder);
    const [orderStatus, setOrderStatus] = useState(selectedOrder?.status || "");
    const dispatch = useDispatch();

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const submitStatus = () => {
        dispatch(updateOrder({ id: selectedOrder._id, status: orderStatus }));
        handleClose();
    };

    if (!selectedOrder) {
        return <></>;
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Order Detail</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">예약번호: {selectedOrder.orderNum}</Typography>
                    <Typography variant="body1">주문날짜: {selectedOrder.createdAt.slice(0, 10)}</Typography>
                    <Typography variant="body1">이메일: {selectedOrder.userId.email}</Typography>
                    <Typography variant="body1">
                        주소: {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
                    </Typography>
                    <Typography variant="body1">
                        연락처:{" "}
                        {`${selectedOrder.contact.firstName + selectedOrder.contact.lastName} ${selectedOrder.contact.contact
                            }`}
                    </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    주문내역
                </Typography>

                <Box sx={{ overflowX: "auto", mb: 3 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder.items.length > 0 &&
                                    selectedOrder.items.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item._id}</TableCell>
                                            <TableCell>{item.productId.name}</TableCell>
                                            <TableCell>{currencyFormat(item.price)}</TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                            <TableCell>{currencyFormat(item.price * item.qty)}</TableCell>
                                        </TableRow>
                                    ))}
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ fontWeight: "bold" }}>
                                        총계:
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>
                                        {currencyFormat(selectedOrder.totalPrice)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitStatus();
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel>Status</FormLabel>
                                <Select value={orderStatus} onChange={handleStatusChange}>
                                    {ORDER_STATUS.map((item, idx) => (
                                        <MenuItem key={idx} value={item.toLowerCase()}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    닫기
                </Button>
                <Button onClick={submitStatus} variant="contained">
                    저장
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailDialog;
