import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Sidebar from "../common/component/Sidebar";
import Navbar from "../common/component/Navbar";
import ToastMessage from "../common/component/ToastMessage";
import { loginWithToken } from "../features/user/userSlice";
import { getCartQty } from "../features/cart/cartSlice";

const AppLayout = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loginWithToken());
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getCartQty());
        }
    }, [user]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <ToastMessage />
            {location.pathname.includes("admin") ? (
                <Box sx={{ height: "100vh", display: "flex" }}>
                    {/* Mobile: Drawer */}
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <Sidebar />
                        </Box>
                    </Drawer>

                    {/* Mobile: Top bar with menu button */}
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1200,
                            bgcolor: "background.paper",
                            borderBottom: 1,
                            borderColor: "divider",
                            p: 1,
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Desktop: Sidebar */}
                    <Box
                        sx={{
                            width: "18%",
                            bgcolor: "background.paper",
                            borderRight: 1,
                            borderColor: "divider",
                            overflow: "auto",
                            display: { xs: "none", md: "block" },
                        }}
                    >
                        <Sidebar />
                    </Box>

                    {/* Main content */}
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "background.default",
                            mt: { xs: 7, md: 0 },
                            overflow: "auto",
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                    <Navbar user={user} />
                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AppLayout;
