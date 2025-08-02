import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 3,
        },
      }}
      onClick={() => showProduct(item._id)}
    >
      <CardMedia component="img" height="200" image={item?.image} alt={item?.name} sx={{ objectFit: "cover" }} />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {item?.name}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          ₩ {currencyFormat(item?.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
