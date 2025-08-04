import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleSelectMenu = (url) => {
        navigate(url);
    };

    return (
        <Box sx={{ p: 2, height: "100vh", overflow: "auto" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h2" component="h2" sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
                    PROJECT
                </Typography>
            </Link>
            <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                Admin Account
            </Typography>
            <List>
                <ListItem
                    component="button"
                    onClick={() => handleSelectMenu("/admin/product?page=1")}
                    sx={{
                        borderRadius: 1,
                        mb: 1,
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <ListItemText primary="Product" />
                </ListItem>
                <ListItem
                    component="button"
                    onClick={() => handleSelectMenu("/admin/order?page=1")}
                    sx={{
                        borderRadius: 1,
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <ListItemText primary="Order" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
