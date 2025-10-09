import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  CssBaseline,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("/api/login", loginCredentials)
      .then((res) => {
        const { user, permissions } = res.data;

        localStorage.setItem("user_permissions", JSON.stringify(permissions));
        localStorage.setItem("auth_user", JSON.stringify(user));

        sessionStorage.clear();
        sessionStorage.setItem("authenticated", "true");

        toast("Login Successful");
        navigate("/app/dashboard");
      })
      .catch((error) => {
        toast(error.message);
        setError(error.response.data.errors.message);
      });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <Container maxWidth={"xs"}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card>
          <CardContent>
            <Typography component={"h1"} variant={"h5"} align="center">
              Login
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              {error && (
                <p
                  align="center"
                  style={{ color: "#b91c1c", fontSize: "14.5px" }}
                >
                  {error}
                </p>
              )}
              <Button
                fullWidth
                variant={"outlined"}
                type={"submit"}
                sx={{ mt: 2, mb: 2 }}
              >
                Login
              </Button>
            </Box>
            <p align="center">
              Don't have an account?{" "}
              <Link to="/app/registration">Register</Link> Now!
            </p>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
