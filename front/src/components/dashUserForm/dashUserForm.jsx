import React, { useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, modifyUser } from "../../redux/actions";
import bcrypt from "bcryptjs-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





export default function DashUserForm({user}){

//Global States
const dispatch = useDispatch();
const users = useSelector((state) => state.users);
const MySwal = withReactContent(Swal);

// Local States
const [input, setInput] = useState({
username: user.username,
email: user.email
});
const [error, setError] = useState({});
const [open, setOpen] = useState(false);

// if(open) console.log(input);
// if(open) console.log('formError', error);

const initialDataJson = JSON.stringify({
  username: user.username,
  email: user.email,
  role: user.role,
  address: user.address,
  phone: user.phone,
  password: '',
  confirm: ''
});
const inputJson = JSON.stringify(input);


// Functions
function handleOpen(){
  setInput({
    username: user.username,
    email: user.email,
    role: user.role,
    address: user.address,
    phone: user.phone,
    password: '',
    confirm: ''
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInput({
    username: '',
    email: '',
    address: '',
    phone: '',
    role: '',
    password: '',
    confirm: ''
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
    username: input.username,
    email: input.email,
    address: input.address,
    phone: input.phone,
    role: input.role,
  };
  
  if(input.password){
    infoToSend.password = bcrypt.hashSync(input.password, 10);
  }

  // for (const property in infoToSend) {
  //   if(infoToSend[property] === ''){
  //     infoToSend[property] = user[property]
  //   };
  // };
  
  await dispatch(modifyUser(user._id, infoToSend));
  dispatch(getAllUsers());
  handleClose();
  return MySwal.fire("User Update succesfully", "" , "success");
};

function validate(input){
  const error = {};
  let RegEXP = /[`ª!@#$%^*-+=[\]{};"\\|,<>/~]/;
  const userExists = users.filter(e => e.username.toLowerCase() !== user.username.toLowerCase() ).find((e) => e.username.toLowerCase() === input.username.toLowerCase());
  
  if (!input.username) {
    error.username = "Username required";
  } else if (RegEXP.test(input.username)) {
    error.username = "Special characters are not accepted";
  } else if (userExists) {
    error.username = "This username is already registered";
  }
  else if (!input.email) {
    error.email = "E-mail required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
    error.email = "Invalid e-mail address";
  } else if (
    users.filter(e => e.email.toLowerCase() !== user.email).find((e) => e.email.toLowerCase() === input.email.toLowerCase())
  ) {
    error.email = "This mail is already registered";
  }
  else if (!input.address) {
    error.address = "Addres required";
  } else if (RegEXP.test(input.address)){
    error.address = "Special characters are not accepted";
  }
  else if (!input.phone) {
    error.phone = "Phone number required";
  }
  else if (input.password && input.password.length < 5){
    error.password = "Password minimum 5 characters";
  }
  else if (input.password !== input.confirm) {
    error.confirmation = "Passwords must match";
  }
  if (!input.role) {
    error.role = "Select role";
  }
  return error;
};



return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined">Update</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Fill the fields you want to change
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        name='username'
        label="Username"
        type="text"
        fullWidth
        variant="outlined"
        value={input.username}
        onChange={(e)=>inputChange(e)}
        error={error.username}
        helperText={error.username}
      />
      <TextField
        autoFocus
        margin="dense"
        id="email"
        name='email'
        label="Email"
        type="text"
        fullWidth
        variant="outlined"
        value={input.email}
        onChange={(e)=>inputChange(e)}
        error={error.email}
        helperText={error.email}
      />
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
        id="password"
        name='password'
        label="New Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.password}
        onChange={(e)=>inputChange(e)}
        error={error.password}
        helperText={error.password}
      />
      <TextField
        autoFocus
        margin="dense"
        id="confirm"
        name='confirm'
        label="Repeat Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.confirm}
        onChange={(e)=>inputChange(e)}
        error={error.confirmation}
        helperText={error.confirmation}
      />
      <FormControl >
        <FormLabel id="radio-group-label-1">Type</FormLabel>
        <RadioGroup
        row
        aria-labelledby="radio-group-label-1"
        name="typebook"
        onChange={e=>inputChange(e)}
        value={input.role}
        >
          <FormControlLabel name="role" value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel name="role" value="user" control={<Radio />} label="User" />
        </RadioGroup>
      </FormControl>
      {error.role && <p className="danger-p">{error.role}</p>}
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {initialDataJson === inputJson || Object.keys(error).length ? (<Button disabled onClick={modifyUserById}>Modify</Button>) : (<Button onClick={modifyUserById}>Modify</Button>)}
        </DialogActions>
    </DialogContent>
  </Dialog>

</React.Fragment>
)};
