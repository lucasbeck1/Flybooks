import bcrypt from "bcryptjs-react";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAllUsers, modifyUser } from "../../redux/actions";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';





export default function PasswordForm({user}){

//Global States
const dispatch = useDispatch();
const navigate = useNavigate();
const MySwal = withReactContent(Swal);
// const users = useSelector((state) => state.users);

// Local States
const [input, setInput] = useState({});
const [error, setError] = useState({});
const [open, setOpen] = useState(false);

// if(open) console.log(input);
// if(open) console.log('formError', error);

const initialDataJson = JSON.stringify({
  oldPassword: '',
  password: '',
  confirm: '',
  address: user.address,
  phone: user.phone,
});
const inputJson = JSON.stringify(input);

// Functions
function handleOpen(){
  setInput({
    oldPassword: '',
    password: '',
    confirm: '',
    address: user.address,
    phone: user.phone,
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInput({
    oldPassword: '',
    password: '',
    confirm: '',
    address: '',
    phone: '',
  });
  setError({});
  setOpen(false);
};

function inputChange(e){
  e.preventDefault();
  setInput({
  ...input,
  [e.target.name]: e.target.value
  });
  setError(validate({
    ...input,
    [e.target.name]: e.target.value
  }));
};

async function modifyUserById(){
  const infoToSend = {
    address: input.address,
    phone: input.phone,
  };
  if(input.oldPassword){
    localStorage.clear();
    const hashPassword = bcrypt.hashSync(input.password, 10);
    infoToSend.password = hashPassword;
  };

  await dispatch(modifyUser(user._id, infoToSend));
  dispatch(getAllUsers());
  handleClose();
  if(input.oldPassword){
   navigate("/login")
    return MySwal.fire("User Update succesfully", "Login please" , "success") 
  }else{
    navigate("/");
    return MySwal.fire("User Update succesfully", "" , "success") 
  }
};

function validate(input){
  const error = {};
  let RegEXP = /[`ª!@#$%^*-+=[\]{};"\\|,<>/~]/;
  if (!input.address) {
    error.address = "Addres required";
  } else if (RegEXP.test(input.address)){
    error.address = "Special characters are not accepted";
  }
  if (!input.phone) {
    error.phone = "Phone number required";
  }
  else if(input.oldPassword && !bcrypt.compareSync(input.oldPassword, user.password)){
    error.oldPassword = "Incorrect Password";
  }
  else if (input.oldPassword && !input.password) {
    error.password = "Password required";
  } else if (input.oldPassword && input.password.length < 6){
    error.password = "Password minimum 6 characters";
  }
  if (input.oldPassword && input.password !== input.confirm) {
    error.confirmation = "Passwords must match";
  }
  return error;
};


return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined">Modify</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Edit Your Account</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Fill the fields you want to change
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="address"
        name='address'
        label="Address"
        type="text"
        fullWidth
        variant="outlined"
        value={input.address}
        onChange={(e)=>inputChange(e)}
        error={error.address}
        helperText={error.address}
      />
      <TextField
        autoFocus
        margin="dense"
        id="phone"
        name='phone'
        label="Phone"
        type="text"
        fullWidth
        variant="outlined"
        value={input.phone}
        onChange={(e)=>inputChange(e)}
        error={error.phone}
        helperText={error.phone}
      />
      <TextField
        autoFocus
        margin="dense"
        id="oldPassword"
        name='oldPassword'
        label="Old Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.oldPassword}
        onChange={(e)=>inputChange(e)}
        error={error.oldPassword}
        helperText={error.oldPassword}
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        name='password'
        label="New Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.newPassword}
        onChange={(e)=>inputChange(e)}
        error={error.password}
        helperText={error.password}
      />
      <TextField
        autoFocus
        margin="dense"
        id="confirm"
        name='confirm'
        label="Repeat New Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.confirm}
        onChange={(e)=>inputChange(e)}
        error={error.confirmation}
        helperText={error.confirmation}
      />
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {initialDataJson === inputJson || Object.keys(error).length ? (<Button disabled onClick={modifyUserById}>Modify</Button>) : (<Button onClick={modifyUserById}>Modify</Button>)}
        </DialogActions>
    </DialogContent>
  </Dialog>

</React.Fragment>
)};
