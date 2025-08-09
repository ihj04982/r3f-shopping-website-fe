import React from "react";
import { IconButton, Grid, Typography, Box, FormControl, Select, MenuItem, Card, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { currencyFormat } from "../../../utils/number";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";

const CartProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleQtyChange = (id, value) => {
        dispatch(updateQty({ id, value }));
    };

    const deleteCart = (id) => {
        dispatch(deleteCartItem(id));
    };

    return (
        <Card sx={{ mb: 2, border: "1px solid #e0e0e0" }}>
            <CardContent>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid size={{ md: 3 }}>
                        <img
                            src={item.productId.image}
                            style={{ width: "100%", maxWidth: "125px", height: "auto" }}
                            alt="product"
                        />
                    </Grid>
                    <Grid size={{ md: 9 }} sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Typography variant="body1">{item.productId.name}</Typography>
                            <IconButton onClick={() => deleteCart(item._id)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Typography variant="body2">Color: {item.color}</Typography>
                            <Typography variant="body2">
                                Total: ₩{currencyFormat(item.productId.price * item.qty)}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Typography variant="body2">수량</Typography>
                                <FormControl size="small" sx={{ minWidth: 50 }}>
                                    <Select
                                        value={item.qty}
                                        onChange={(event) => handleQtyChange(item._id, Number(event.target.value))}
                                        displayEmpty
                                        size="small"
                                        variant="standard"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <MenuItem key={num} value={num}>
                                                {num}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CartProductCard;
