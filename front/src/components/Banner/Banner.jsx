import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Banner() {
  return (
    <React.Fragment>
      <CssBaseline />
   
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: "200px" }}>
        <img alt="banner" src="https://cdn.pixabay.com/photo/2016/09/07/16/19/pile-1651945_960_720.jpg" height='1200' width="250px"/>
        </Box>
 
    </React.Fragment>
  );
}
