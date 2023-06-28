import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoverPassword, getAllUsers } from "../../redux/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";

export const RecoverPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [form, setForm] = useState({
    email: "",
  });

  const recover = users.find(
    (e) => e.email.toLowerCase() === form.email.toLowerCase()
  );

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    dispatch(recoverPassword(form));
    if (recover) {
      navigate("/login");
      return MySwal.fire(
        "¡Check your email to get your new password!",
        message,
        "success"
      );
    }else{
      return MySwal.fire(
        "¡The email is not registered!",
        message,
        "error"
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", padding: 6 }}
        className="texts-login"
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{ bgcolor: "#ebebeb", padding: 3, borderRadius: 2 }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{ color: "#013a63", mb: 1 }}
            >
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}></Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#013a63" }}>
              Recover Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                onChange={(e) => handleChange(e)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                endIcon={<Send />}
                sx={{ mt: 3, mb: 2, color: "#013a63", border: 1 }}
              >
                Send Instructions
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </div>
  );
};
