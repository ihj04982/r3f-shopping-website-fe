import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const showProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <Box
            sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                p: 2,
            }}
            onClick={() => showProduct(item._id)}
        >
            <Box
                component="img"
                src={item?.image}
                alt={item?.name}
                sx={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    objectFit: "cover",
                    mb: 2,
                }}
            />
            <Typography variant="body1" component="div" noWrap>
                {item?.name}
            </Typography>
            <Typography variant="body1" color="primary">
                ₩{currencyFormat(item?.price)}
            </Typography>
        </Box>
    );
};

export default ProductCard;
