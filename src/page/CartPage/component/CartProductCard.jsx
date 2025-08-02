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
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <img
                            src={item.productId.image}
                            style={{ width: "100%", maxWidth: "112px", height: "auto" }}
                            alt="product"
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                            <Typography variant="h6" component="h3">
                                {item.productId.name}
                            </Typography>
                            <IconButton onClick={() => deleteCart(item._id)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                            ₩ {currencyFormat(item.productId.price)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Size: {item.size}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                            Total: ₩ {currencyFormat(item.productId.price * item.qty)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body2">Quantity:</Typography>
                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <Select
                                    value={item.qty}
                                    onChange={(event) => handleQtyChange(item._id, event.target.value)}
                                    displayEmpty
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <MenuItem key={num} value={num}>
                                            {num}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CartProductCard;
