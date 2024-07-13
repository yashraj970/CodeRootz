import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { rootColors } from "../../utilities/Colors/Colors";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utilities/toast";
import { CircularProgress } from "@mui/material";
import { Login_Api } from "../../config/constants";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GHL-AI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      axios
        .post(Login_Api, {
          username: formData?.email,
          password: formData?.password,
        })
        .then((response) => {
          console.log(response);
          if (response?.data?.token) {
            notifySuccess("Login successful");
            localStorage.setItem("token", response?.data?.token);
            setLoading(false);
            navigate("/assistants");
          } else {
            notifyError("Invalid credentials");
            setLoading(false);
          }
        })
        .catch((error) => {
          notifyError("An error occurred while logging in");
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              background: rootColors?.primary,
              fontWeight: "500",
              color: "white",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <Grid item xs={12} textAlign={"left"}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: rootColors?.primary,
                color: "white",
                "&:hover": {
                  backgroundColor: rootColors?.primary,
                },
                fontWeight: "500",
              }}
            >
              {loading ? <CircularProgress /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link href="recoveraccount" variant="body2" color={"#fff"}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="/signup" variant="body2" color={"#fff"}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} color={"#fff"} />
      </Container>
    </div>
  );
};

export default Login;
