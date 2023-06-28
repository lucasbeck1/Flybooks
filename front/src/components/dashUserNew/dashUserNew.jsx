import { LockClockOutlined, Pageview, Send } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography
} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import bcrypt from "bcryptjs-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, createUserFromAdmin, getAllUsers } from "../../redux/actions";




export default function DashUserNew(){

//Global States
const dispatch = useDispatch();
const users = useSelector((state) => state.users);

useEffect(() => {
  dispatch(getAllUsers());
}, [dispatch]);


// Local States
const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);
const [errors, setError] = useState({});
const [input, setInputs] = useState({
  username: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  confirmation: "",
  role:"user",
});
// if(open) console.log(input);


// Functions
function handleOpen(){
  setInputs({
    username: "",
    email: "",
    password: "",
    confirmation: "",
    address: "",
    phone: "",
    role:"user",
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInputs({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmation: "",
    role:"user",
  });
  setError({});
  setOpen(false);
};

function handleOpen2(){
  setOpen2(true);
};

function handleClose2(){
  setOpen2(false);
};


async function handleSubmit(e){
  e.preventDefault();
  if (!input.username || !input.email || !input.password || !input.address ||
  !input.phone || !input.password) {
    alert("Cannot have empty elements!!");
  } else {
    const hashPassword = bcrypt.hashSync(input.password, 10);
    dispatch(createCustomer({ username: input.username, email: input.email }));
    await dispatch(createUserFromAdmin({
      username: input.username,
      password: hashPassword,
      email: input.email,
      role: input.role,
      address: input.address,
      phone: input.phone,
      confirm: true
    }))
    dispatch(getAllUsers());
    handleClose();
    handleOpen2();}
};

function handleUser(e){
  setInputs({ ...input, [e.target.name]: e.target.value });
  setError(validate({ ...input, [e.target.name]: e.target.value }));
    // console.log(input);
};

function validate(input){
  const errors = {};
  let RegEXP = /[`ª!@#$%^*-+=[\]{};"\\|,<>/~]/;
  if (!input.username) {
    errors.username = "Username required";
  } else if (RegEXP.test(input.username)) {
    errors.username = "Special characters are not accepted";
  }
  else if (!input.email) {
    errors.email = "E-mail required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
    errors.email = "Invalid e-mail address";
  } else if (
    users.find((e) => e.email.toLowerCase() === input.email.toLowerCase())
  ) {
    errors.email = "This mail is already registered";
  }
  else if (!input.address) {
    errors.address = "Addres required";
  } else if (RegEXP.test(input.address)){
    errors.address = "Special characters are not accepted";
  }
  else if (!input.phone) {
    errors.phone = "Phone number required";
  }
  else if (!input.password) {
    errors.password = "Password required";
  } else if (input.password.length < 6){
    errors.password = "Password minimum 6 characters";
  }
  else if (input.password !== input.confirmation) {
    errors.confirmation = "Passwords must match";
  }
  else if (!input.role) {
    errors.role = "Select role";
  }
  return errors;
};




return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="contained" endIcon={<AddCircleOutlineOutlinedIcon />}>New</Button>

  <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Grid
        container
        component="main"
        sx={{ height: "100vh", padding: 6 }}
        className="texts-login"
      >
        <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", borderRadius: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" sx={{color: "#013a63", mb: 1}}>
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}>
              <LockClockOutlined />
            </Avatar>
            
            <Typography component="h1" variant="h5" sx={{ color: "#013a63" }}>
              New User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e)=> handleSubmit(e)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => handleUser(e)}
                    error={errors.username}
                    helperText={errors.username}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleUser(e)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    onChange={(e) => handleUser(e)}
                    error={errors.address}
                    helperText={errors.address}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => handleUser(e)}
                    error={errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                    error={errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmation"
                    label="Repeat Password"
                    type="password"
                    id="confirmation"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                    error={errors.confirmation}
                    helperText={errors.confirmation}
                  />
                </Grid>
               
              </Grid>
                <FormControl sx={{mt:1}} >
                  <FormLabel id="radio-group-label-1">Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="radio-group-label-1"
                    name="typebook"
                    onChange={e=>handleUser(e)}
                    value={input.role}
                  >
                    <Typography component="h1" variant="h5" sx={{ color: "#495057" }}>
                    <FormControlLabel name="role" value="admin" control={<Radio />} label="Admin" />
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ color: "#495057" }}>
                    <FormControlLabel name="role" value="user" control={<Radio />} label="User" />
                    </Typography>
                    
                  </RadioGroup>
                </FormControl>
                {errors.role && <p className="danger-p">{errors.role}</p>}
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                >
                  Cancel
                </Button>
                {!input.username || Object.keys(errors).length ? (<Button
                  type="submit"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                  endIcon={<Send />}
                  disabled
                >Create
                </Button>) : (<Button
                  type="submit"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                  endIcon={<Send />}
                >  Create
                </Button>)}
                
                
              </DialogActions>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Dialog>
    
    <Dialog open={open2} onClose={handleClose2} maxWidth="md">
      <Grid container component="main" sx={{ height: "100vh", padding: 6 }} className="texts-login">
        <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", padding: 8, borderRadius: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" sx={{color: "#013a63", mb: 1}}>
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}>
            <Pageview />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color: "#013a63", mb:6}}>
              ¡A link has been sent to your email to verify your account!
            </Typography>
            <Button
              onClick={handleClose2}
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
            >
              Close
            </Button> 
          </Box>
        </Container>
      </Grid>
    </Dialog>
</React.Fragment>
)};
