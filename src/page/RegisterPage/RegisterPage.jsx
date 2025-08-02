import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Paper
} from "@mui/material";
import { registerUser } from "../../features/user/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const { registrationError } = useSelector((state) => state.user);

  const register = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) {
      setPasswordError("비밀번호 중복확인이 일치하지 않습니다.");
      return;
    }
    if (!policy) {
      setPolicyError(true);
      return;
    }
    setPasswordError("");
    setPolicyError(false);
    dispatch(registerUser({ name, email, password, navigate }));
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    if (id === "confirmPassword" && passwordError) setPasswordError("");
    if (type === "checkbox") {
      if (policyError) setPolicyError(false);
      setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ width: '100%', p: 4 }}>
        {registrationError && (
          <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
            {registrationError}
          </Alert>
        )}

        <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          회원가입
        </Typography>

        <Box component="form" onSubmit={register} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Name"
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={!!passwordError}
            helperText={passwordError}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="policy"
                checked={formData.policy}
                onChange={handleChange}
              />
            }
            label="이용약관에 동의합니다"
            sx={{ mb: 2 }}
          />

          {policyError && (
            <FormHelperText error sx={{ mb: 2 }}>
              이용약관에 동의해주세요.
            </FormHelperText>
          )}

          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            회원가입
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;