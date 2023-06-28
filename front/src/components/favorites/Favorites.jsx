import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStorage,
  clearFavorites,
  deleteFavoriteItemById,
  getUsersDetail
} from "../../redux/actions";

import { Delete } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from "@mui/joy/Stack";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Favorites() {
  const MySwal = withReactContent(Swal);
  if(!localStorage.getItem("favs")){
    localStorage.setItem("favs","[]")
  }

  let getCart = JSON.parse(localStorage.getItem("cart"));
  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let favscurrent = JSON.parse(localStorage.getItem("favs"));

  useEffect(() => {
    if(loading)return
    let session = JSON.parse(localStorage.getItem("session"));
    let id = session[0].id;
    dispatch(getUsersDetail(id));
  }, );

  // console.log("detail", usersDetail);

  // Loading SetTimeOut


  function cartHandler(detail, message) {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      // console.log(detail);
      getCart.filter((e) => e._id === detail._id).length < 1
        ? getCart.push(detail)
        : MySwal.fire(
            "You already have this product in the cart!",
            message,
            "error"
          );
      localStorage.setItem("cart", JSON.stringify(getCart));
      if (getCart.filter((e) => e._id === detail._id).length < 1) {
        dispatch(addStorage(id, detail));
      }

      // console.log(getCart);
    } else {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
      }
      let getCart = JSON.parse(localStorage.getItem("cart"));
      getCart.filter((e) => e._id === detail._id).length < 1
        ? getCart.push(detail)
        : MySwal.fire(
            "You already have this product in the cart!",
            message,
            "error"
          );
      localStorage.setItem("cart", JSON.stringify(getCart));
    }
  }
  function handlerDeleteAll(e, message) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      dispatch(clearFavorites(session[0].id));
      localStorage.setItem("favs", "[]");
      MySwal.fire("You delete all Favorites Items!", message, "info");

      // navigate("/");
      setLoading(false)
    } else {
      localStorage.setItem("favs", "[]");
      MySwal.fire("You delete all Favorites Items!", message, "info");
      // navigate("/");
      setLoading(false)

    }
  }
  function deleteItem(el) {
    let favCurrent = JSON.parse(localStorage.getItem("favs"));
    let result = favCurrent.filter((e) => e._id !== el);
    let session = JSON.parse(localStorage.getItem("session"));
    dispatch(deleteFavoriteItemById(session[0].id, el));
    localStorage.setItem("favs", JSON.stringify(result));
    // navigate("/favorites");
    setLoading(false)

  }

  // console.log(usersDetail);
  return (
    favscurrent.length ? 
    <Grid>
      <Box
      bgcolor="white"
      sx={{

      }} 
      >
      <Typography>
        My Favorites Books
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => handlerDeleteAll(e)}
      >
        <Add />
        delete all items
      </Button>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {
          favscurrent.map((elm) => (
            <Grid>
              <Box
                sx={{
                  width: 220,
                  // height: "450%",
                  border: "dotted",
                  // border: ,
                  borderColor: "white",
                  borderRadius: 6,
                  marginBottom: 6,
                  // bgcolor: "#006ba6",
                  bgcolor: "#ebebeb",
                  boxShadow: "40px 60px 80px  #595959",
                }}
              >
                <Typography
                  align="center"
                  variant="h5"
                  color="initial"
                  marginTop="10px"
                  fontSize="100%"
                  bgcolor="#006ba6"
                  p="15px"
                  height="80px"
                  // className="texts-login2"
                  sx={{
                    borderTopLeftRadius: "17px",
                    borderTopRightRadius: "17px",
                    borderBottom: 3,
                    borderBottomColor: "white",
                    color: "white",
                    marginTop: "-px",
                  }}
                >
                  {elm.title.length > 60
                    ? elm.title.slice(0, 35) + "..."
                    : elm.title}
                </Typography>
                <Box display="flex" justifyContent="center">
                  <CardMedia
                    component="img"
                    sx={{
                      marginTop: 2,
                      marginBottom: 3,
                      width: 170,
                      height: 200,
                      objectFit: "fill",
                      borderRadius: 4,
                      bgcolor: "#ebebeb",
                    }}
                    image={elm.image}
                    alt="img"
                  />
                </Box>
                <Typography
                  align="center"
                  variant="h5"
                  color="initial"
                  marginTop="10px"
                  fontSize="100%"
                  bgcolor="#013a63"
                  p="15px"
                  className="texts-login2"
                  sx={{
                    borderTop: 3,
                    color: "black",
                    marginTop: "-px",
                    borderTopColor: "white"
                  }}
                >
                  {elm.author}
                  <hr />${elm.price}
                </Typography>
                <Grid>
                  <Box
                    sx={{
                      borderBottomLeftRadius: "17px",
                      borderBottomRightRadius: "17px",
                    }}
                    bgcolor="white"
                    p="10px"
                    display="flex"
                    justifyContent="center"
                  >
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <Button
                        variant="contained"
                        endIcon={<AddShoppingCartIcon />}
                        onClick={(e) => cartHandler(elm)}
                      >
                       add
                      </Button>
                      <Button
                        variant="outlined" 
                        color="error"
                        endIcon={<Delete />}
                        onClick={() => deleteItem(elm._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Grid>: 
          <Alert severity="info">You don't have favorite books - choose one!</Alert>
  );
}
