import React, { useState, useEffect } from "react";
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
    Avatar,
    Divider,
    IconButton,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../constants/order.constants.js";
import { currencyFormat } from "../../../utils/number";
import { updateOrder } from "../../../features/order/orderSlice";

const OrderDetailDialog = ({ open, handleClose }) => {
    const selectedOrder = useSelector((state) => state.order.selectedOrder);
    const { loading, error } = useSelector((state) => state.order);
    const [orderStatus, setOrderStatus] = useState(selectedOrder?.status || "");
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedOrder) {
            setOrderStatus(selectedOrder.status);
        }
    }, [selectedOrder]);

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const submitStatus = async () => {
        if (selectedOrder) {
            await dispatch(updateOrder({ id: selectedOrder._id, status: orderStatus }));
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitStatus();
                }}
            >
                <DialogTitle>
                    Order Detail
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {error && (
                    <Box sx={{ px: 3, pt: 1 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>주문번호:</strong> {selectedOrder.orderNum}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>주문날짜:</strong>{" "}
                                    {new Date(selectedOrder.createdAt).toLocaleDateString("ko-KR")}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>고객명:</strong> {selectedOrder.userId?.name || "N/A"}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>이메일:</strong> {selectedOrder.userId?.email || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>배송주소:</strong> {selectedOrder.shipTo?.address}{" "}
                                    {selectedOrder.shipTo?.city}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>연락처:</strong> {selectedOrder.contact?.firstName}{" "}
                                    {selectedOrder.contact?.lastName} ({selectedOrder.contact?.contact})
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2 }}>
                            <FormControl fullWidth>
                                <FormLabel>Order Items</FormLabel>
                                <Box sx={{ overflowX: "auto", mt: 1 }}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Color</TableCell>
                                                    <TableCell>Qty</TableCell>
                                                    <TableCell>Unit Price</TableCell>
                                                    <TableCell>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedOrder.items.length > 0 &&
                                                    selectedOrder.items.map((item) => (
                                                        <TableRow key={item._id}>
                                                            <TableCell>{item._id}</TableCell>
                                                            <TableCell>
                                                                {item.productId?.image && (
                                                                    <img
                                                                        src={item.productId.image}
                                                                        style={{
                                                                            width: "50px",
                                                                            height: "50px",
                                                                            objectFit: "cover",
                                                                            borderRadius: "4px",
                                                                        }}
                                                                        alt="product"
                                                                    />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.productId?.name || "Unknown Product"}
                                                            </TableCell>
                                                            <TableCell>{item.color || "N/A"}</TableCell>
                                                            <TableCell>{item.qty}</TableCell>
                                                            <TableCell>
                                                                {currencyFormat(item.productId?.price || item.price)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {currencyFormat(
                                                                    (item.productId?.price || item.price) * item.qty
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                <TableRow>
                                                    <TableCell colSpan={6} sx={{ fontWeight: "bold" }}>
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
                            </FormControl>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            value={orderStatus}
                                            onChange={handleStatusChange}
                                            disabled={loading}
                                            required
                                        >
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
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" disabled={loading}>
                        {loading ? "처리중..." : "Edit"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default OrderDetailDialog;
