import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsersDetail } from "../../redux/actions";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";




export default function InfoBuy({Purchase}){

const dispatch = useDispatch();
useEffect(() => {
  dispatch(getUsersDetail(Purchase.sellerId));
});

const allBooks = useSelector((state) => state.allbooks);
const product = Purchase.productId;
const book = allBooks.find(u => u._id === product);

const seller = useSelector((state) => state.userDetail[0]);
const allScores = seller && seller.reviews.map((elm) => {return elm.score});
let score = "No Score";

if (allScores.length){
  score = Math.round(allScores.reduce((acc, curr) => acc + curr) / allScores.length)
};

const day = Purchase.date.split(' ');

// const buyer = Purchase.buyerId;
const [open, setOpen] = useState(false);

// Functions
function handleOpen(){
  setOpen(true);
};

function handleClose(){
  setOpen(false);
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

return (<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined" size="small">Info</Button>
  <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
    <Box   
          component="main"
          sx={{ bgcolor: "#fff", height: "74vh" }}>
    <Grid item xs={24}>
    
      <Grid >
            <DialogTitle sx={{ padding: 2 , textAlign: "center"}}>{Purchase.title}</DialogTitle>
      <Box>
      <Grid item xs={12} sx={{ padding: 2 }}>
      <Item>
      <DialogContentText variant={'h6'}>
    Buy
  </DialogContentText>
  <Box  > 
  <Typography variant={'subtitle1'}>
  Author: {book.author}
  </Typography>
  
  </Box>
  <Box> 
  <Typography variant={'subtitle1'}>
    Editorial: {book.editorial}
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
    Language: {book.language}
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
    State: {book.state} - {book.typebook}
  </Typography>
  </Box>
      </Item>

</Grid>

<Grid item xs={12} sx={{ padding: 2 }}>
  <Item>
  <Box >
  <Typography variant={'h6'}>
    Seller
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
      User: {Purchase.sellerName} - Score: {score}
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
    Contact: {seller.email ? (seller.email) : ('')}
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
    {`Date of purchase: ${day[0]}`}
  </Typography>
  </Box>
  <Box>
  <Typography variant={'subtitle1'}>
    {`Amount: ${Purchase.amount}`}
  </Typography>
  </Box>   
  </Item>
  <br></br>
  <Box sx={{ padding: 2 , textAlign: "center"}}>  
      <Button onClick={handleClose}>Close</Button>
      {/* <Button >Report</Button>
      <Button >Mark as received</Button> */}
  </Box>

  </Grid>
</Box>

   
  
      </Grid>
   
    </Grid>
    </Box>

  </Dialog>
  </React.Fragment>)
  };
