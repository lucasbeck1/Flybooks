import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import jwt from "jwt-decode";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs-react";
// import Loader from "../loader/Loader";

import withReactContent from "sweetalert2-react-content";
import {
  // createCustomer,
  findUserStripe,
  getAllUsers,
  // loginGoogle,
  loginUser,
} from "../../redux/actions";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
// import { Google } from "@mui/icons-material";
import {  Send, Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const [input, setInputs] = useState({
    password: "",
    username: "",
  });

  const user = users.find(
    (e) => e.username.toLowerCase() === input.username.toLowerCase()
  );

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    dispatch(findUserStripe(input.username));
    dispatch(loginUser({ password: input.password, username: input.username }));

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }

    if (user) {
      if (bcrypt.compareSync(input.password, user.password)) {
        if (user.confirm === true) {
          if(user.available === true){
            navigate("/");
          }else{
            return MySwal.fire("¡Suspended user!", message, "error");
          }
        } else {
          return MySwal.fire("¡Unverified Account!", message, "error");
        }
      } else {
        return MySwal.fire("¡Incorrect Password!", message, "error");
      }
    } else {
      return MySwal.fire("¡Incorrect User!", message, "error");
    }
  };
  // const [loading, setLoading] = useState(false);
  // const changeState = () => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 3000);
  // };
  // if (!loading) {
  //   changeState();
  //   return <Loader />;
  // }

  const handleUser = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
      // console.log(input);
  };

  // const handleGoogle = () => {
  //   dispatch(createCustomer());
  //   dispatch(findUserStripe());
    
  //   let cookie=jwt(document.cookie.split(";"))
  //   let hola=cookie.split(";")
  //   let chau= hola[0].split("jwt=")
   
  //     // if(cookie){
        
  //     // }
  //   console.log(cookie);
  //       localStorage.setItem("session","[]")
  //       let aux=JSON.parse(localStorage.getItem("session"))
  //       aux.push(chau[1])
  //       localStorage.setItem("session",JSON.stringify(aux))
    
  // };



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                onChange={(e) => handleUser(e)}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" fullWidth>
                  Password *
                </InputLabel>
                <OutlinedInput
                  margin="normal"
                  id="outlined-adornment-password"
                  label="Password"
                  onChange={(e) => handleUser(e)}
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                endIcon={<Send />}
                sx={{ mt: 3, mb: 2, color: "#013a63", border: 1 }}
              >
                Sign In
              </Button>
              {/* <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2, border: 1, color: "#013a63" }}
              href="http://localhost:3001/google/signin"
              onClick={(e) => handleGoogle(e)}
              >
                <Google />
                <Typography sx={{ ml: 1, color: "#013a63" }}>Google</Typography>
              </Button> */}

              <Grid container>
                <Grid item xs sx={{ opacity: 0.7 }}>
                  <Link to="/recoverpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item sx={{ opacity: 0.7 }}>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </div>
  );
};
