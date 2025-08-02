import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loginWithEmail } from "../../features/user/userSlice";
import { clearErrors } from "../../features/user/userSlice";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import {
  Container,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [navigate]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async () => {
    //구글 로그인 하기
  };

  if (user) {
    navigate("/");
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2,
        boxShadow: 1,
        border: 1,
        borderColor: 'divider'
      }}>
        {loginError && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {loginError}
          </Alert>
        )}

        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          로그인
        </Typography>

        <Box component="form" onSubmit={handleLoginWithEmail} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Login
            </Button>
            <Typography variant="body2">
              아직 계정이 없으세요?{" "}
              <Link to="/register" style={{ color: 'primary.main', textDecoration: 'none' }}>
                회원가입 하기
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              외부 계정으로 로그인하기
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
