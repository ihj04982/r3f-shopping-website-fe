import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = ({ handleInputFocus, cardValue, handlePaymentInfoChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Cards
            cvc={cardValue.cvc}
            expiry={cardValue.expiry}
            focused={cardValue.focus}
            name={cardValue.name}
            number={cardValue.number}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
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
              maxLength: 16,
              minLength: 16,
            }}
            value={cardValue.number}
            variant="outlined"
          />

          <TextField
            fullWidth
            type="text"
            name="name"
            placeholder="Name"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
            variant="outlined"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                name="expiry"
                placeholder="MM/DD"
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                value={cardValue.expiry}
                inputProps={{
                  maxLength: 7,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                name="cvc"
                placeholder="CVC"
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                inputProps={{
                  maxLength: 3,
                }}
                value={cardValue.cvc}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
