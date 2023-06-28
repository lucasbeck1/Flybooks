import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFavorites,
  addStorage,
  getBooksDetails,
  getAllUsers,
} from "../../redux/actions";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddShoppingCartOutlined,
  Book,
  FavoriteOutlined,
  MenuBookOutlined,
  PaidOutlined,
  StyleOutlined,
} from "@mui/icons-material";

export default function Detail() {
  let detail = useSelector((state) => state.detailsBook);
  const theme = useSelector((state) => state.darkMode);
  let users = useSelector((state) => state.users);

  let { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  let getCart = JSON.parse(localStorage.getItem("cart"));

  const user = users.find((elm) => {
    return elm._id === detail.sellerId;
  });
    // console.log("usuariooo", user);

  const score =
    user &&
    user.reviews.map((elm) => {
      return elm.score;
    });

  useEffect(() => {
    dispatch(getBooksDetails(_id));
    dispatch(getAllUsers());
  }, [dispatch, _id]);

  function paymentHandler(e) {
    e.preventDefault();
    navigate(`/payment/${_id}`);
  }

  function cartHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      if (getCart.filter((e) => e._id === detail._id).length < 1) {
        getCart.push(detail);
        localStorage.setItem("cart", JSON.stringify(getCart));
        dispatch(addStorage(id, detail));
      } else {
        MySwal.fire(
          "You already have this product in the cart!",
          message,
          "error"
        );
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

  function favsHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("favs")) {
      localStorage.setItem("favs", "[]");
    }
    let favs = JSON.parse(localStorage.getItem("favs"));
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      if (favs.filter((e) => e._id === detail._id).length < 1) {
        favs.push(detail);
        localStorage.setItem("favs", JSON.stringify(favs));
        dispatch(addFavorites(id, detail));
      } else {
        MySwal.fire(
          "You already have this product in the cart!",
          message,
          "error"
        );
      }
    } else {
      if (!localStorage.getItem("favs")) {
        localStorage.setItem("favs", "[]");
      }

      MySwal.fire(
        "Please register to be able to add products to Favorites!",
        message,
        "info"
      );
      navigate("/login");
    }
  }

  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  if (!loading) {
    changeState();
    return <Loader />;
  }

  return (
    <div>
      <Header noSearch={true} />

      <Grid
        container
        component="main"
        direction="row"
        justifyContent="space-evenly"
      >
        <CssBaseline />

        <Grid item xs={12} sm={6} md={4} sx={{ height: "100%" }}>
          <img width={"100%"} height={645} src={detail.image} alt="" />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ backgroundColor: theme && "#212529", color: theme && "white" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ff6700" }}>
                <Book />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {detail.title}
              </Typography>
            </Box>

            <Box component="form" noValidate sx={{ margin: 2 }}>
              <p>
                <b>Author: </b>
                <span>{detail.author}</span>
              </p>
              <p>
                <b>Categorie: </b>
                <span>{detail.categorie}</span>
              </p>
              <p>
                <b>Editorial: </b>
                <span>{detail.editorial}</span>
              </p>
              <p>
                <b>Saga: </b>
                <span>{detail.saga}</span>
              </p>
              <p>
                <b>Language: </b>
                <span>{detail.language}</span>
              </p>
              <p>
                <b>Gender: </b>
                <span>
                  {detail.gender?.map((e, i) => {

                    if(i < detail.gender.length -1){
                    return <span>{e}, </span>;}
                    else{
                      return <span>{e}. </span>;
                    }
                  })}
                </span>
              </p>
              <p>
                <b>Year: </b>
                <span>{detail.year}</span>{" "}
              </p>
              <p>
                <b>State: </b>
                <span>{detail.state}</span>{" "}
              </p>
              <Grid>
                {detail.typebook && detail.typebook === "virtual" ? (
                  <p>
                    <StyleOutlined /> Ebook
                  </p>
                ) : (
                  <p>
                    <MenuBookOutlined /> Physical book
                  </p>
                )}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                $ {detail.price} 
              </Typography>
              <Button
                startIcon={<PaidOutlined />}
                onClick={(e) => paymentHandler(e)}
                sx={{ color: "white", bgcolor: "green" }}
              >
                Buy
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={<FavoriteOutlined />}
                onClick={(e) => favsHandler(e)}
                sx={{ color: "red" }}
              >
                Add favorites
              </Button>
              <Button
                startIcon={<AddShoppingCartOutlined />}
                onClick={(e) => cartHandler(e)}
                sx={{ color: "#006ba6" }}
              >
                Add Cart
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{ backgroundColor: theme && "#212529", color: theme && "white" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#ebebeb",
                borderRadius: 4,
              }}
            >
              <p >
                <b> Seller: </b>
                <span>{detail.seller}</span>{" "}
              </p>
              {score.length ? (
                  <Rating
                    name="read-only"
                    sx={{mb:2}}
                    value={Math.round(
                      score.reduce((acc, curr) => acc + curr) / score.length
                    )}
                    readOnly
                  />
              ) : (
                <p>
                  <b>No Score Yet</b>
                </p>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Reviews
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                bgcolor: "#ebebeb",
                borderRadius: 4,
                height: 450,
              }}
            >
              {!user.reviews.length ? (
                <p>There are no reviews</p>
              ) : (
                user.reviews.map((elm) => {
                  const colours = [
                    "orange",
                    "blue",
                    "green",
                    "black",
                    "violet",
                    "yellow",
                    "red",
                  ];
                  const random = Math.floor(Math.random() * colours.length);
                  return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: colours[random], ml:2 }}>
                        {elm.buyerUsername.charAt(0).toUpperCase()}
                      </Avatar>
                      <TextField
                        label={
                          elm.buyerUsername.toUpperCase() + ": " + elm.comment
                        }
                        fullWidth
                        sx={{
                          bgcolor: "white",
                          margin: 2,
                          border: 0,
                          color: "blue",
                          borderRadius: 2,
                        }}
                        boxShadow={3}
                        disabled
                      />
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
