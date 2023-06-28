import {
  AutoStories,
  CollectionsBookmark, Favorite, Home, Settings
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Alert, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  disablePost, getAllAuthor, getAllBooks, getAllEditorial, getAllSaga, getAllUsers, getCategories,
  getGenders,
  getLanguages
} from "../../redux/actions";
import Favorites from "../favorites/Favorites";
import Reviews from "../reviews/Reviews";
import Account from "./Account";
import MyProducts from "./MyProducts";

const drawerWidth = 240;


function Profile(props) {
  const [component, setComponent] = useState("Account");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate()

  // Call Global States
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllUsers());
    dispatch(getCategories());
    dispatch(getGenders());
    dispatch(getLanguages());
    dispatch(getAllAuthor());
    dispatch(getAllSaga());
    dispatch(getAllEditorial());
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  // const loadBooks = useSelector((state) => state.books);
  // const allUsers = useSelector((state) => state.users);
  // const [open, setOpen] = useState(false);
  // Local States
  let session = JSON.parse(localStorage.getItem("session"));
  let aux = allBooks.filter((e) => e.sellerId === session[0].id);

  // let [productInput, setProductInput] = useState({});
  // const [advice, setAdvice] = useState("");


  // Functions

  async function disableItem(e) {
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(disablePost(itemId));
    dispatch(getAllBooks());
  }
 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const myComponents = [
    {
      text: "Favorites",
      icon: <Favorite />,
    },
    {
      text: "My Products",
      icon: <CollectionsBookmark />,
    },
    {
      text: "My Books",
      icon: <AutoStories />,
    },
    {
      text: "Account",
      icon: <Settings />,
      path: "/",
    },
    {
      text: "Home",
      icon: <Home />,
      path: "/",
    }
  ];

  const drawer = (
    <div className="texts-login"> 
      <Toolbar />
      <Divider color="white" variant="middle"/>
      <List className="texts-login" sx={{height:"100vh"}} >
        {myComponents.map((elm, index) => (
          elm.text !== "Home"?
          <ListItem button key={index} onClick={() => setComponent(elm.text)}>
            <ListItemIcon>{elm.icon}</ListItemIcon>
            <ListItemText primary={elm.text} />
          </ListItem>:
           <ListItem button key={index} onClick={() => navigate(elm.path)}>
           <ListItemIcon>{elm.icon}</ListItemIcon>
           <ListItemText primary={elm.text} />
         </ListItem>
        ))}
      <Divider color="white" variant="middle"/>
      </List>
      <Divider/>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#013a63",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {session[0].username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height:"40vh"
        }}
      > 

        <Toolbar />
        <Grid >
        
          {component === "Favorites" && (
            <>
              <Favorites />
            </>
          )}
          {component === "My Products" && (
            <>
          
              {aux.length? aux.map((b) => {
                return (
                  <div key={b._id}>
                    <MyProducts
                      id={b._id}
                      buyers={b.buyers}
                      title={b.title}
                      image={b.image}
                      typebook={b.typebook}
                      price={b.price}
                      author={b.author}
                      categorie={b.categorie}
                      editorial={b.editorial}
                      saga={b.saga}
                      language={b.language}
                      gender={b.gender}
                      year={b.year}
                      state={b.state}
                      available={b.available}
                      disable={disableItem}
                  
                    />
                  </div>
                );
              })
              :
              <Alert severity="info">You don't have published products already !- Go to Create Product!</Alert>
            }
            </>
          )}
            {component === "My Books" && (
            <>
            
              <Reviews />
            </>
          )}
          {component === "Account" && (
            <>
              <Account />
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

Profile.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Profile;
