import React, { useState} from "react";
import {  useDispatch } from "react-redux";
import { getAllUsers, disableUser, deleteUser } from "../../redux/actions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DashUserForm from "../dashUserForm/dashUserForm";
import Button from '@mui/material/Button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function DashUser({user}) {
  // Call Global States
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);

  // Functions
  function handleOpen(){
    setOpen(true);
  }
  
  function handleClose(){
    setOpen(false);
  }
  
  async function disableUserById(e){
    e.preventDefault();
    let stateAux = user.available ? ("disabled") : ("enabled");
    let itemId = e.target.value;
    await dispatch(disableUser(itemId));
    dispatch(getAllUsers());
    return MySwal.fire(`The user ${user.username} has been ${stateAux}`, "" , "info");
  };
  
  async function deleteUserById(e){
    e.preventDefault();
    let itemId = user._id
    await dispatch(deleteUser(itemId));
    dispatch(getAllUsers());
    handleClose();
    return MySwal.fire(`The user ${user.username} has been deleted`, "" , "info");
  };
  

  
  
  return (<React.Fragment>
    <TableRow
    key={user.username}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">{user.username}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.address}</TableCell>
      <TableCell align="left">{user.phone}</TableCell>
      <TableCell align="left">{user.role}</TableCell>
      <TableCell align="center">
        {user.available? (<CheckOutlinedIcon/>) : (<ClearOutlinedIcon/>)}
      </TableCell>
      <TableCell align="center">
        <DashUserForm user={user}/>
        {user.available ? 
        (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Disable</Button>) : 
        (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Enable</Button>)}
        <Button value={user._id} onClick={handleOpen} variant="outlined">Delete</Button>
      </TableCell>
  </TableRow>
  
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Delete User</DialogTitle>
    <DialogContentText sx={{p:9}}>
      Are you sure to delete {user.username} ?
    </DialogContentText>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={e=>deleteUserById(e)}>Delete</Button>
    </DialogActions>
  </Dialog>
  

  
</React.Fragment>
)};
