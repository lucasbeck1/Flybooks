import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noImgAvailable from "./mclovin-sony-pictures-entertainment.jpg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CreateProductPreview({ input }) {
  let navigate = useNavigate();
  function backBtn(e) {
    e.preventDefault();
    navigate("/");
  }

  const isActive=useMediaQuery("(max-width:600px)")
  const imageState = useSelector((state) => state.images);
  return (
    <div>
      {isActive?   <Box>
   
        <Button variant="outlined" onClick={(e) => backBtn(e)}>
          Back
        </Button>
      
        <List>
            <br/>
          <Divider />
<br/>
          <Grid container spacing={1}>
            <Grid item xs={6}>
            <br/>
            <br/>
              {imageState.length ? (
                <CardMedia
                  sx={{
                    width: 190,
                    height: 220,
                    objectFit: "fill",
                    borderRadius: 4,
                  }}
                  image={imageState}
                  alt="img"
                />
              ) : (
                <CardMedia
                  display="flex"
                  justify="center"
                  component="img"
                  sx={{
                    width: 190,
                    height: 220,
                    objectFit: "fill",
                    borderRadius: 4,
                    bgcolor:"#ebebeb"
                  }}
                  image={noImgAvailable}
                  alt="img"
                />
              )}
            </Grid>
            <Grid item xs={6}>
            
              <br/>
     
              <br/>
              
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Language{" "}
                    </Typography>
                    <ListItemText
                      primary={input.language ? `${input.language}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Category{" "}
                    </Typography>
                    <ListItemText
                      primary={input.categorie ? `${input.categorie}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Saga
                    </Typography>
                    <ListItemText
                      primary={input.saga ? `${input.saga}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Year
                    </Typography>
                    <ListItemText
                      primary={input.year ? `${input.year}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Price{" "}
                    </Typography>
                    <ListItemText
                      primary={input.price ? `U$D ${input.price}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
       
            </Grid>
          </Grid>
                  <br/>
          <div>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Title
                </Typography>
                <ListItemText primary={input.title ? `${input.title}` : " "} />
              </Typography>
            </ListItem>
          </div>
          <Divider />

          <span>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Author{" "}
                </Typography>
                <ListItemText
                  primary={input.author.length ? `${input.author}` : " "}
                />
              </Typography>
            </ListItem>
          </span>
          <Divider />

          <span>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Editorial{" "}
                </Typography>
                <ListItemText
                  primary={input.editorial ? `${input.editorial}` : " "}
                />
              </Typography>
            </ListItem>
          </span>
          <Divider />
          <span>
                <ListItem button fullWidth>
                  <Typography  sx={{ wordBreak: "break-word" }}>
                    <Typography variant="body-2" color="#1C1C20">
                      State
                    </Typography>
                
                    <ListItemText  primary={input.state ? ` ${input.state}` : " "}/>
              
                  </Typography>
                </ListItem>
              </span>
              <Divider />
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Typebook{" "}
                    </Typography>
                    <ListItemText
                      primary={input.typebook ? `${input.typebook}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
        </List>
      </Box> :   <Box>
        <Button variant="outlined" onClick={(e) => backBtn(e)}>
          Back
        </Button>
      
        <List>
            <br/>
          <Divider />
<br/>
          <Grid container spacing={1}>
            <Grid item xs={6}>
            <br/>
            <br/>
              {imageState.length ? (
                <CardMedia
                  sx={{
                    maxWidth: 210,
                    height: 320,
                    objectFit: "fill",
                    borderRadius: 4,
                  }}
                  image={imageState}
                  alt="img"
                />
              ) : (
                <CardMedia
                  display="flex"
                  justify="center"
                  component="img"
                  sx={{
                    maxWidth: 250,
                    height: 320,
                    objectFit: "fill",
                    borderRadius: 4,
                    bgcolor:"#ebebeb"
                  }}
                  image={noImgAvailable}
                  alt="img"
                />
              )}
            </Grid>
            <Grid item xs={6}>
            
              <br/>
     
              <br/>
              
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Language{" "}
                    </Typography>
                    <ListItemText
                      primary={input.language ? `${input.language}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Category{" "}
                    </Typography>
                    <ListItemText
                      primary={input.categorie ? `${input.categorie}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Saga
                    </Typography>
                    <ListItemText
                      primary={input.saga ? `${input.saga}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Year
                    </Typography>
                    <ListItemText
                      primary={input.year ? `${input.year}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
              <Divider />

              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Price{" "}
                    </Typography>
                    <ListItemText
                      primary={input.price ? `U$D ${input.price}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
       
            </Grid>
          </Grid>
                  <br/>
          <div>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Title
                </Typography>
                <ListItemText primary={input.title ? `${input.title}` : " "} />
              </Typography>
            </ListItem>
          </div>
          <Divider />

          <span>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Author{" "}
                </Typography>
                <ListItemText
                  primary={input.author.length ? `${input.author}` : " "}
                />
              </Typography>
            </ListItem>
          </span>
          <Divider />

          <span>
            <ListItem button fullWidth>
              <Typography sx={{ wordBreak: "break-word" }}>
                 <Typography variant="body-2" color="#1C1C20">
                  Editorial{" "}
                </Typography>
                <ListItemText
                  primary={input.editorial ? `${input.editorial}` : " "}
                />
              </Typography>
            </ListItem>
          </span>
          <Divider />
          <span>
                <ListItem button fullWidth>
                  <Typography  sx={{ wordBreak: "break-word" }}>
                    <Typography variant="body-2" color="#1C1C20">
                      State
                    </Typography>
                
                    <ListItemText  primary={input.state ? ` ${input.state}` : " "}/>
              
                  </Typography>
                </ListItem>
              </span>
              <Divider />
              <span>
                <ListItem button fullWidth>
                  <Typography sx={{ wordBreak: "break-word" }}>
                     <Typography variant="body-2" color="#1C1C20">
                      Typebook{" "}
                    </Typography>
                    <ListItemText
                      primary={input.typebook ? `${input.typebook}` : " "}
                    />
                  </Typography>
                </ListItem>
              </span>
        </List>
      </Box>}
   
    </div>
  );
}
