import { Pageview } from '@mui/icons-material'
import { Avatar, Box, Container, CssBaseline, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const ConfirmAcount = () => {
  return (
    <div>
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
                
                <Grid item sx={{opacity: 0.7}}>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
            </Box>
        </Container>
      </Grid>
    </div>
  )
}

