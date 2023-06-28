import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function InfoReview({buyerId, productId}){

 
  const allUsers = useSelector((state) => state.users);
  let Review = {sellerName:'Name', score:' - / 5', comment:'comment'};
  
  if(allUsers.length){
    const user = allUsers.find(user => user._id === buyerId);
    const userReviews = user.myreviews;
    const review1 = userReviews.find(rev => rev.productId === productId);
    if(review1) Review = review1
  
  };

  // Local States
  const [open, setOpen] = useState(false);
  
  // Functions
  function handleOpen(){
    setOpen(true);
  };
  function handleClose(){
    setOpen(false);
  };
  
  
  return (<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined" size="small">Review</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Review of {Review.sellerName}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Score: {Review.score} / 5
      </DialogContentText>
      <DialogContentText>
        Comment: {Review.comment}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  </React.Fragment>)
};
