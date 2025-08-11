import React from "react";
import { Grid, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import { CreditCard } from "@mui/icons-material";

const CreditCardVisualization = ({ cardValue }) => {
    const formatCardNumber = (number) => {
        if (!number) return "•••• •••• •••• ••••";
        const cleaned = number.replace(/\s/g, "");
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(" ") : cleaned;
    };

    const formatExpiry = (expiry) => {
        if (!expiry) return "MM/YY";
        return expiry;
    };

    const getCardType = (number) => {
        if (!number) return "generic";
        const cleaned = number.replace(/\s/g, "");
        if (cleaned.startsWith("4")) return "visa";
        if (cleaned.startsWith("5")) return "mastercard";
        if (cleaned.startsWith("3")) return "amex";
        return "generic";
    };

    const cardType = getCardType(cardValue.number);

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: 350,
                height: 200,
                background: "linear-gradient(135deg, #202124 0%, #404040 100%)",
                color: "#ffffff",
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                border: "1px solid #e8eaed",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -15,
                    left: -15,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                },
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 3,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontFamily: "'Noto Sans KR', Arial, sans-serif",
                            fontSize: "1rem",
                            letterSpacing: "0.025em",
                        }}
                    >
                        {cardType === "visa" ? "VISA" : cardType === "mastercard" ? "MASTERCARD" : "CREDIT CARD"}
                    </Typography>
                    <CreditCard sx={{ fontSize: 32, opacity: 0.7, color: "#ffffff" }} />
                </Box>

                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "'Noto Sans KR', Arial, sans-serif",
                            letterSpacing: 1,
                            mb: 2,
                            fontWeight: 500,
                            fontSize: "1.25rem",
                            color: "#ffffff",
                        }}
                    >
                        {formatCardNumber(cardValue.number)}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    opacity: 0.7,
                                    display: "block",
                                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                                    fontSize: "0.75rem",
                                    fontWeight: 400,
                                    color: "#ffffff",
                                }}
                            >
                                CARD HOLDER
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                                    fontSize: "0.875rem",
                                    color: "#ffffff",
                                }}
                            >
                                {cardValue.name || "YOUR NAME"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    opacity: 0.7,
                                    display: "block",
                                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                                    fontSize: "0.75rem",
                                    fontWeight: 400,
                                    color: "#ffffff",
                                }}
                            >
                                EXPIRES
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                                    fontSize: "0.875rem",
                                    color: "#ffffff",
                                }}
                            >
                                {formatExpiry(cardValue.expiry)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const PaymentForm = ({ handleInputFocus, cardValue, handlePaymentInfoChange }) => {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <CreditCardVisualization cardValue={cardValue} />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        fullWidth
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={handlePaymentInfoChange}
                        onFocus={handleInputFocus}
                        required
                        inputProps={{
                            maxLength: 19,
                        }}
                        value={cardValue.number}
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        fullWidth
                        type="text"
                        name="name"
                        placeholder="Name on Card"
                        onChange={handlePaymentInfoChange}
                        onFocus={handleInputFocus}
                        required
                        value={cardValue.name}
                        variant="outlined"
                        size="small"
                    />

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                value={cardValue.expiry}
                                inputProps={{
                                    maxLength: 5,
                                }}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                inputProps={{
                                    maxLength: 4,
                                }}
                                value={cardValue.cvc}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PaymentForm;
