import React from "react";
import { CircularProgress, Box, Backdrop } from "@mui/material";

const LoadingSpinner = ({
    size = 40,
    color = "primary",
    fullScreen = false,
    overlay = false,
    message = "로딩 중...",
}) => {
    const spinner = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                ...(fullScreen && {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }),
            }}
        >
            <CircularProgress size={size} color={color} />
            {message && (
                <Box
                    component="span"
                    sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                    }}
                >
                    {message}
                </Box>
            )}
        </Box>
    );

    if (overlay) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                {spinner}
            </Backdrop>
        );
    }

    return spinner;
};

export default LoadingSpinner;
