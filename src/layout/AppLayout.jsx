import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import Sidebar from "../common/component/Sidebar";
import Navbar from "../common/component/Navbar";
import ToastMessage from "../common/component/ToastMessage";
import { loginWithToken } from "../features/user/userSlice";
import { getCartQty } from "../features/cart/cartSlice";

const AppLayout = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loginWithToken());
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getCartQty());
        }
    }, [user]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <ToastMessage />
            {location.pathname.includes("admin") ? (
                <Grid container sx={{ minHeight: "100vh" }}>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        lg={2.5}
                        sx={{
                            bgcolor: "background.paper",
                            borderRight: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Sidebar />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        lg={9.5}
                        sx={{
                            bgcolor: "background.default",
                        }}
                    >
                        {children}
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
