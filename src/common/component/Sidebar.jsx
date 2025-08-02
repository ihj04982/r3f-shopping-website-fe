import React, { useState } from "react";
import {
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleSelectMenu = (url) => {
        setShow(false);
        navigate(url);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setShow(open);
    };

    const NavbarContent = () => {
        return (
            <Box sx={{ p: 2 }}>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
                </Link>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                    Admin Account
                </Typography>
                <List>
                    <ListItem
                        button
                        onClick={() => handleSelectMenu("/admin/product?page=1")}
                        sx={{
                            borderRadius: 1,
                            mb: 1,
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <ListItemText primary="Product" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => handleSelectMenu("/admin/order?page=1")}
                        sx={{
                            borderRadius: 1,
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <ListItemText primary="Order" />
                    </ListItem>
                </List>
            </Box>
        );
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <Box
                sx={{
                    display: { xs: "none", md: "block" },
                    height: "100vh",
                    bgcolor: "background.paper",
                    borderRight: 1,
                    borderColor: "divider",
                }}
            >
                {NavbarContent()}
            </Box>

            {/* Mobile Sidebar */}
            {isMobile && (
                <>
                    <AppBar position="static" color="default" elevation={1} sx={{ display: { md: "none" } }}>
                        <Toolbar>
                            <img width={80} src="/image/hm-logo.png" alt="hm-logo.png" />
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Drawer anchor="left" open={show} onClose={toggleDrawer(false)} sx={{ display: { md: "none" } }}>
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    p: 1,
                                }}
                            >
                                <IconButton onClick={toggleDrawer(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            {NavbarContent()}
                        </Box>
                    </Drawer>
                </>
            )}
        </>
    );
};

export default Sidebar;
