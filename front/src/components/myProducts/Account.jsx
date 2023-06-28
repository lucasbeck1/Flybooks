import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsersDetail } from "../../redux/actions";
import PasswordForm from "./PasswordForm";

import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Account() {
  
  // Global State
  const dispatch = useDispatch();
  const session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    dispatch(getUsersDetail(session[0].id));
  }, );
  
  const user = useSelector((state) => state.userDetail[0]);
  let role ='';
  if(user && user.role === 'admin') role = 'Admin';

  
  
  // Functions
  
  
  return(<React.Fragment>
  <h1>This is Account</h1>
  <p>Balance: ${user && Math.ceil(user.balance) + '.00'} | Notificaciones</p>
  
  {user?
  (<Card sx={{ maxWidth: 345 }} key={user.username}>
      <Box sx={{pt:3, pl:15}}>
        <Avatar sx={{ bgcolor: "#2196f3", width: 70, height: 70}}>{user.username[0].toUpperCase()}</Avatar>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {user.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {user.phone}
        </Typography>
      </CardContent>
      <CardActions>
          <PasswordForm user={user}/>
          <Typography variant="body1" color="#4caf50" sx={{ml:20}}>
            {role}
          </Typography>
      </CardActions>
  </Card>) 
  :(<></>)}
  
  </React.Fragment>)
};
