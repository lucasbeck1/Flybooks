import DeleteIcon from "@mui/icons-material/Delete";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {
  Box,
  Button,
  CardMedia, Grid,
  List,
  ListItem, Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AddressElement, CardElement, Elements, useElements, useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  addBuyerToProduct,
  addPurchases,
  balanceProfile,
  cartMailing,
  clearStorage,
  deleteStorageItemById,
  disablePost, getUsersDetail
} from "../../redux/actions";
import Header from "../header/Header";
const stripePromise = loadStripe(
  "pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g"
);

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Verdana, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Verdana, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  borderRadius: 10,
  background: "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ebebeb",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 4,
}));

const CheckoutForm = () => {
  const isActive = useMediaQuery("(max-width:870px)");
  // const userState= useSelector(state=>state.userDetail)
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const MySwal = withReactContent(Swal);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  if(!localStorage.getItem("cart")){
    localStorage.setItem("cart","[]")
  }
  let getCart = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = {
    amount: getCart
      ? getCart.map((e) => e.price).reduce((sum, item) => sum + item, 0)
      : 0,
    description: getCart ? getCart.map((e) => e._id).join(" ") : " ",
  
  };
  
  // console.log(totalAmount);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e, message) => {
    e.preventDefault();
    let userId = JSON.parse(localStorage.getItem("session"));
    dispatch(getUsersDetail(userId[0].id))
    if (userId) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);

      if (!error) {
        // console.log(paymentMethod);
        const { id } = paymentMethod;
        let stripeId = JSON.parse(localStorage.getItem("stripe"));
        // console.log(stripeId[0].id);
        try {
          const { data } = await axios.post(
            "https://flybooks.up.railway.app/api/checkout",
            {
              id,
              amount: Math.ceil(totalAmount.amount) * 100,
              created: totalAmount.description,
              customer: stripeId[0].id,
            }
          );

          let session = JSON.parse(localStorage.getItem("session"));
          // console.log(data.customer);
          elements.getElement(CardElement).clear();
          // console.log("CardElement", CardElement);
          MySwal.fire("Thank You for your purchase!", message, "success");
          const date = new Date()
          const hour = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
          const day = [date.getDate(), date.getMonth() +1, date.getFullYear()].join('-');
          const fullDate = `${day} ${hour}`;
          getCart.map((elm) =>
            dispatch(
              addPurchases(session[0].id, {
                productId: elm._id,
                buyerId: session[0].id,
                buyerName: session[0].username,
                sellerId: elm.sellerId,
                sellerName: elm.seller,
                username: elm.seller,
                image: elm.image,
                title: elm.title,
                amount: Math.ceil(elm.price),
                date: fullDate,
              })
            )

          );
          
   
        getCart.map((elm) =>
        dispatch(addBuyerToProduct( elm._id,session[0]))
      );
      
      getCart.map((elm) =>
        dispatch(balanceProfile(elm.sellerId,{balance:Math.ceil(elm.price)}))
      );


     
    let products=[]
    products.push(getCart.map((e) =>e))
            // console.log(products);  
      dispatch(cartMailing({
        username:session[0].username,
        email:session[0].email,
        allProducts:products[0],
        amount:totalAmount.amount}))
         getCart.map((elm) =>
        dispatch(disablePost( elm._id))
      );
          localStorage.setItem("cart", "[]");
          dispatch(clearStorage(session[0].id));
        } catch (error) {
          // console.log(error);
        }
        setLoading(false);
      }
    } else {
      MySwal.fire(
        "Please register to be able to buy products!",
        message,
        "info"
      );
      navigate("/login");
    }
  };

  function handlerDeleteAll(e, message) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      dispatch(clearStorage(session[0].id));
      localStorage.setItem("cart", "[]");
      MySwal.fire("You delete all Cart Items!", message, "info");
      navigate("/");
    } else {
      localStorage.setItem("cart", "[]");
      MySwal.fire("You delete all Cart Items!", message, "info");
      navigate("/");
    }
  }

  function deleteItem(el) {
    let cartCurrent = JSON.parse(localStorage.getItem("cart"));
    let result = cartCurrent.filter((e) => e._id !== el);
    let session = JSON.parse(localStorage.getItem("session"));
    dispatch(deleteStorageItemById(session[0].id, el));
    localStorage.setItem("cart", JSON.stringify(result));
    navigate("/cart");
  }

  return (
    <Box>
      {" "}
      {isActive ? (
        <Box>
          <Box sx={{ background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)", height: "100vh" }}>
            <Header noSearch={true} />

            <Box component="main" sx={{ bgcolor: "#013a63", padding: 8 }}>
              <form onSubmit={handleSubmit}>
                <Grid spacing={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => handlerDeleteAll(e)}
                  >
                    Delete all Cart Items
                  </Button>
                  {getCart.length ? (
                    getCart.map((e) => (
                      <Grid item xs={12}>
                        <br></br>
                        <Item sx={{ borderRadius: 4 }}>
                          <List>
                            <Grid >
                              <Grid item xs={12 } sx={{ padding: 2}}>
                                <Item3 >
                                  <Grid  >
                                  <Grid item xs={5.3} spacing={2}>
                                    <Item>
                                    <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ mb: 2 }}
                                    type="button"
                                    onClick={() => deleteItem(e._id)}
                                    startIcon={<DeleteIcon />}
                                  >
                                    DELETE
                                  </Button>

                                  <CardMedia
                                    display="flex"
                                    justify="center"
                                    component="img"
                                    sx={{
                                      width: "80%",
                                      height: "100%",
                                      objectFit: "fill",
                                      borderRadius: 2,
                                      bgcolor: "#ebebeb",
                                      ml:"10%",
                                      mb:"2%"

                                    }}
                                    fullWidth
                                    image={e.image}
                                    alt="img"
                                  />
                                    </Item>

                                  </Grid>

                                  <br></br>


                                    <Grid item xs={6}>
                                    <ListItem
                                    button
                                    fullWidth
                                    sx={{
                                      background:
                                        "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                      ":hover": {
                                        background:
                                          "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                      },
                                      borderRadius: 2,
                                    }}
                                  >
                                    <Typography
                                      sx={{ wordBreak: "break-word" }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        color="#FFF"
                                      >
                                        Seller{" "}
                                      </Typography>
                                      <Box color="#FFF">{e.seller}</Box>
                                    </Typography>
                                  </ListItem>
                                  <br></br>
                                  <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            Price{" "}
                                          </Typography>
                                          <Box color="#FFF">{`U$D ${e.price}`}</Box>
                                        </Typography>
                                      </ListItem>
  <br></br>
                                      <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            Title{" "}
                                          </Typography>
                                          <Box color="#FFF">{e.title}</Box>
                                        </Typography>
                                      </ListItem>
                                      <br></br>
                                      <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            Author{" "}
                                          </Typography>
                                          <Box color="#FFF">{e.author}</Box>
                                        </Typography>
                                      </ListItem>
                                         <br></br>
                                      <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            Language{" "}
                                          </Typography>
                                          <Box color="#FFF">{e.language}</Box>
                                        </Typography>
                                      </ListItem>
                                      <br></br>
                                      <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            State{" "}
                                          </Typography>
                                          <Box color="#FFF">{e.state}</Box>
                                        </Typography>
                                      </ListItem>
                                      <br></br>
                                      <ListItem
                                        button
                                        fullWidth
                                        sx={{
                                          background:
                                            "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                          ":hover": {
                                            background:
                                              "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                          },
                                          borderRadius: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{ wordBreak: "break-word" }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            color="#FFF"
                                          >
                                            Editorial{" "}
                                          </Typography>
                                          <Box color="#FFF">{e.editorial}</Box>
                                        </Typography>
                                      </ListItem>

                                  </Grid>

                                  </Grid>
                            
                                </Item3>
                              </Grid>

                                      
                            </Grid>
                          </List>
                        </Item>
                      </Grid>
                    ))
                  ) : (
                    <Box>
                      <br />
                      <br />
                      <Grid>
                        <Grid item xs={5} sx={{ ml: 3, mr: 3 }}>
                          {" "}
                          <Item>
                            <Typography variant="h5">
                              {" "}
                              Your Cart is Empty{" "}
                            </Typography>
                            <br></br>
                            <br></br> <RemoveShoppingCartIcon color="error" />{" "}
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
 <br></br>
                  {getCart.length ? (
                    <Box>
                      {" "}
                      <Grid item xs={4}>
                        <Item sx={{ borderRadius: 4, padding: 4 }}>
                          {totalAmount.amount !== 0 ? (
                            <div>
                              <br />
                              <br />
                              <CardElement options={cardStyle} />
                              <br />
                              <br />
                              <AddressElement
                                sx={{ borderRadius: 4 }}
                                options={{ mode: "shipping" }}
                                onChange={(event) => {
                                  if (event.complete) {
                                    // Extract potentially complete address
                                    const address = event.value.address;
                                    setAddress(address);
                                  }
                                }}
                              />
                              <br></br>
                              <Item2 sx={{ borderRadius: 4 }}>
                                <ListItem
                                  button
                                  fullWidth
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #013a63 10%, #006ba6 90%)",
                                    borderRadius: 4,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      wordBreak: "break-word",
                                      color: "#FFF",
                                    }}
                                  >
                                    <Typography variant="subtitle1">
                                      Items:{" "}
                                    </Typography>

                                    {getCart.map((e) => (
                                      <Box color="#FFF">
                                        {" "}
                                        {`-${e.title}  U$D ${e.price}`}
                                      </Box>
                                    ))}
                                    <Typography variant="h6" color="#FFF">
                                      <Box>{`Total: U$D ${ Math.ceil(totalAmount.amount)}`}</Box>
                                    </Typography>
                                  </Typography>
                                </ListItem>
                              </Item2>
                              <br></br>
                              {address && (
                                <Button
                                  type="submit"
                                  disabled={!stripe}
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #45F350 0%, #2BCA35 100%)",
                                    borderRadius: 2,
                                    color: "#FFF",
                                    width: 120,
                                  }}
                                >
                                  {loading ? (
                                    <Box role="status">
                                      <Box>Loading...</Box>
                                    </Box>
                                  ) : (
                                    "Buy"
                                  )}
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div> </div>
                          )}
                        </Item>
                      </Grid>
                    </Box>
                  ) : (
                    <Box> </Box>
                  )}
                  <br></br>
                </Grid>
              </form>
            </Box>
          </Box>
          
        </Box>
      ) : (
        <Box sx={{ background:
          "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)", height: "100vh" }}>
          <Header noSearch={true} />

          <Box component="main" sx={{ background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)", padding: 8 }}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={2}>
                <br></br>
                <br></br>
                <br></br>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => handlerDeleteAll(e)}
                >
                  Delete all Cart Items
                </Button>
                {getCart.length ? (
                  getCart.map((e) => (
                    <Grid item xs={12}>
                      <br></br>
                      <Item sx={{ borderRadius: 4 }}>
                        <List>
                          <Grid container >
                            <Grid item xs={2.1} sx={{ padding: 2, mr: 4 }}>
                              <Item3>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  sx={{ mb: 2,width:"100%" }}
                                  type="button"
                                  onClick={() => deleteItem(e._id)}
                                  startIcon={<DeleteIcon />}
                                >
                                  DELETE
                                </Button>

                                <CardMedia
                                  display="flex"
                                  justify="center"
                                  component="img"
                                  sx={{
                                    width: "80%",
                                    height: "100%",
                                    objectFit: "fill",
                                    borderRadius: 2,
                                    bgcolor: "#ebebeb",
                                    ml:"10%"
                                  }}
                                  fullWidth
                                  image={e.image}
                                  alt="img"
                                />
                                <br></br>
                                <ListItem
                                  button
                                  fullWidth
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #ff6700 0%,  #013a63 90%)",
                                    ":hover": {
                                      background:
                                        "linear-gradient(135deg, #ff6700 0%, #013a63 100%)",
                                    },
                                    borderRadius: 2,
                                  }}
                                >
                                  <Typography sx={{ wordBreak: "break-word" }}>
                                    <Typography
                                      variant="subtitle1"
                                      color="#FFF"
                                    >
                                      Seller{" "}
                                    </Typography>
                                    <Box color="#FFF">{e.seller}</Box>
                                  </Typography>
                                </ListItem>
                              </Item3>
                            </Grid>

                            <Grid item xs={9} sx={{ mt: 5 }}>
                              <Item2>
                                <Grid container spacing={4}>
                                  <br></br>

                                  <Grid item xs={6}>
                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#013a63" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          Title{" "}
                                        </Typography>
                                        <Box color="#FFF">{e.title}</Box>
                                      </Typography>
                                    </ListItem>

                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#006ba6" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          Price{" "}
                                        </Typography>
                                        <Box color="#FFF">{`U$D ${e.price}`}</Box>
                                      </Typography>
                                    </ListItem>

                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#013a63" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          Author{" "}
                                        </Typography>
                                        <Box color="#FFF">{e.author}</Box>
                                      </Typography>
                                    </ListItem>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#006ba6" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          State{" "}
                                        </Typography>
                                        <Box color="#FFF">{e.state}</Box>
                                      </Typography>
                                    </ListItem>
                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#013a63" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          Editorial{" "}
                                        </Typography>
                                        <Box color="#FFF">{e.editorial}</Box>
                                      </Typography>
                                    </ListItem>

                                    <ListItem
                                      button
                                      fullWidth
                                      sx={{ bgcolor: "#006ba6" }}
                                    >
                                      <Typography
                                        sx={{ wordBreak: "break-word" }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          color="#FFF"
                                        >
                                          Language{" "}
                                        </Typography>
                                        <Box color="#FFF">{e.language}</Box>
                                      </Typography>
                                    </ListItem>
                                  </Grid>
                                </Grid>
                              </Item2>
                            </Grid>
                          </Grid>
                        </List>
                      </Item>
                    </Grid>
                  ))
                ) : (
                  <Box>
                    <br />
                    <br />
                    <Grid>
                      <Grid item xs={5} sx={{ ml: 40, mr: 40 }}>
                        {" "}
                        <Item>
                          <Typography variant="h5">
                            {" "}
                            Your Cart is Empty{" "}
                          </Typography>
                          <br></br>
                          <br></br> <RemoveShoppingCartIcon color="error" />{" "}
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                )}
<br></br>
                {getCart.length ? (
                  <Box>
                    {" "}
                    <Grid item xs={4}>
                      <Item sx={{ borderRadius: 4, padding: 4 }}>
                        {totalAmount.amount !== 0 ? (
                          <div>
                            <br />
                            <br />
                            <CardElement options={cardStyle} />
                            <br />
                            <br />
                            <AddressElement
                              sx={{ borderRadius: 4 }}
                              options={{ mode: "shipping" }}
                              onChange={(event) => {
                                if (event.complete) {
                                  // Extract potentially complete address
                                  const address = event.value.address;
                                  setAddress(address);
                                }
                              }}
                            />
                            <br></br>
                            <Item2 sx={{ borderRadius: 4 }}>
                              <ListItem
                                button
                                fullWidth
                                sx={{
                                  background:
                                    "linear-gradient(135deg, #013a63 10%, #006ba6 90%)",
                                  borderRadius: 4,
                                }}
                              >
                                <Typography
                                  sx={{
                                    wordBreak: "break-word",
                                    color: "#FFF",
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    Items:{" "}
                                  </Typography>

                                  {getCart.map((e) => (
                                    <Box color="#FFF">
                                     
                                      {" "}
                                      {`-${e.title}  U$D ${e.price}`}
                                    </Box>
                                  ))}
                                  <Typography variant="h6" color="#FFF">
                                    <Box>{`Total: U$D ${Math.ceil(totalAmount.amount)}`}</Box>
                                  </Typography>
                                </Typography>
                              </ListItem>
                            </Item2>
                            <br></br>
                            {address && (
                              <Button
                                type="submit"
                                disabled={!stripe}
                                sx={{
                                  background:
                                    "linear-gradient(135deg, #45F350 0%, #2BCA35 100%)",
                                  borderRadius: 2,
                                  color: "#FFF",
                                  width: 120,
                                }}
                              >
                                {loading ? (
                                  <Box role="status">
                                    <Box>Loading...</Box>
                                  </Box>
                                ) : (
                                  "Buy"
                                )}
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div> </div>
                        )}
                      </Item>
                    </Grid>
                  </Box>
                ) : (
                  <Box> </Box>
                )}
                <br></br>
              </Grid>
            </form>
          </Box>
        </Box>
      )}
      
    </Box>
  );
};

function Cart() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Cart;
