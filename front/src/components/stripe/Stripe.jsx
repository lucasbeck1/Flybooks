import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import {
  AddressElement, CardElement, Elements, useElements, useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  addBuyerToProduct,
  addPurchases,
  balanceProfile,
  deleteStorageItemById,
  disablePost,
  getBooksDetails,
  getUsersDetail,
  payMailing
} from "../../redux/actions";
import Header from "../header/Header";
import "./Stripe.css";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const stripePromise = loadStripe(
 "pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g"
);
// console.log(  process.env);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CheckoutForm = () => {
  const isActive = useMediaQuery("(max-width:600px)");
  const detailState = useSelector((state) => state.detailsBook);
  let { _id } = useParams();

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailsBooks = useSelector((state) => state.detailsBook);
  const MySwal = withReactContent(Swal);
  const [address,setAddress]=useState("")
  const userState= useSelector(state=>state.userDetail)


  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("session"));
    dispatch(getBooksDetails(_id));
    dispatch(getUsersDetail(userId[0].id))
  }, [dispatch, _id]);

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    let userId = JSON.parse(localStorage.getItem("session"));

    if (userId) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);

      if (!error) {
    
        const { id } = paymentMethod;

        let stripeId = JSON.parse(localStorage.getItem("stripe"));


        try {
       await axios.post(
            "https://flybooks.up.railway.app/api/checkout",
            {
              id,
              amount: Math.ceil(detailState.price) * 100,
              created: detailState._id,
              customer: stripeId[0].id,
            }
          );

          let cartCurrent = JSON.parse(localStorage.getItem("cart"));
          if (cartCurrent) {
            let result = cartCurrent.filter((e) => e._id !== _id);
            localStorage.setItem("cart", JSON.stringify(result));
          }
          let session = JSON.parse(localStorage.getItem("session"));
          dispatch(deleteStorageItemById(session[0].id, _id));
  
          const date = new Date()
          const hour = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
          const day = [date.getDate(), date.getMonth() +1, date.getFullYear()].join('-');
          const fullDate = `${day} ${hour}`;
          
          dispatch(payMailing({
            username:session[0].username,
            email:session[0].email,
            product:detailsBooks,
            amount:Math.ceil(detailsBooks.price)}))

             
          


          dispatch(
            addPurchases(session[0].id, {
              productId: _id,
              buyerId: session[0].id,
              buyerName: session[0].username,
              username: detailsBooks.seller,
              sellerId: detailsBooks.sellerId,
              sellerName: detailsBooks.seller,
              image: detailsBooks.image,
              title: detailsBooks.title,
              amount: Math.ceil(detailsBooks.price),
              date: fullDate,
            }) 
          );
          elements.getElement(CardElement).clear();
          dispatch(addBuyerToProduct(detailsBooks._id,userState[0]))
          dispatch(balanceProfile(detailsBooks.sellerId,{balance:Math.ceil(detailsBooks.price)}))
          dispatch(disablePost(detailsBooks._id))
          MySwal.fire("Thank You for your purchase!", message, "success");
          navigate("/");
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
    // console.log(userState);
  };

  return (
    <Box>
      {isActive ? (
        <Box>
         
          <Box sx={{ bgcolor: "#013a63", height: "100vh" }}>
            <Header noSearch={true} />
            <br />
            <br />

            <Box component="main" sx={{ bgcolor: "#013a63", padding: 2}}>
              <form onSubmit={handleSubmit}>
                <Grid  spacing={2} >
                  <Grid item xs={4}>
                    <Item sx={{ borderRadius: 4 }}>
                      <List>
                        <Grid container spacing={4}>
                          <Grid item xs={4}>
                            <CardMedia
                              display="flex"
                              justify="center"
                              component="img"
                              sx={{
                                width: 250,
                                height: 320,
                                objectFit: "fill",
                                borderRadius: 2,
                                bgcolor: "#ebebeb",
                              }}
                              fullWidth
                              image={detailState.image}
                              alt="img"
                            />
                          </Grid>
                          </Grid>
                          {/* <Grid item xs={6}>
                            <br></br>
  
                          </Grid> */}
                                               

                        <br></br>
                          <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#F9F9F9" }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  Price{" "}
                                </Typography>
                                <ListItemText
                                  primary={`U$D ${detailState.price}`}
                                />
                              </Typography>
                            </ListItem>
                      
                            <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#ebebeb" }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  State{" "}
                                </Typography>
                                <ListItemText primary={detailState.state} />
                              </Typography>
                            </ListItem>
                     

                            <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#F9F9F9"  }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  Seller{" "}
                                </Typography>
                                <ListItemText primary={detailState.seller} />
                              </Typography>
                            </ListItem>


                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Title{" "}
                            </Typography>
                            <ListItemText primary={detailState.title} />
                          </Typography>
                        </ListItem>
                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Id{" "}
                            </Typography>
                            <ListItemText primary={detailState._id} />
                          </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Author{" "}
                            </Typography>
                            <ListItemText primary={detailState.author} />
                          </Typography>
                        </ListItem>
                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Editorial{" "}
                            </Typography>
                            <ListItemText primary={detailState.editorial} />
                          </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Language{" "}
                            </Typography>
                            <ListItemText primary={detailState.language} />
                          </Typography>
                        </ListItem>
                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Year{" "}
                            </Typography>
                            <ListItemText primary={detailState.year} />
                          </Typography>
                        </ListItem>
                        <Divider />
                      </List>
                    </Item>
                  </Grid>
            
                      <br />
                  <Grid item xs={6}>
                    <Item sx={{ borderRadius: 4 }}>
                      <br />
                      <br />
                      <Item>
                        <CardElement options={cardStyle} />
                      </Item>
                      <br />
                      <br />
                      <AddressElement
                        options={{ mode: "shipping" }}
                        onChange={(event) => {
                          if (event.complete) {
                            // Extract potentially complete address
                        
                          }
                        }}
                      />
                      <br />
                      <br />
                      {!stripe?                     
                       <Button
                        type="submit"
                        variant="outlined"
                        disabled
                      >
                        Buy
                      </Button>:                    
                       <Button
                        type="submit"
                        variant="outlined"
                        disabled={!stripe}
                      >
                        {loading ? (
                          <Box role="status">
                            <span>Loading...</span>
                          </Box>
                        ) : (
                          "Buy"
                        )}
                      </Button>}

                    </Item>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ bgcolor: "#013a63", height: "100vh" }}>
            <Header noSearch={true} />
            <br />
            <br />

            <Box component="main" sx={{ bgcolor: "#013a63", padding: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Item sx={{ borderRadius: 4 }}>
                      <List>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <CardMedia
                              display="flex"
                              justify="center"
                              component="img"
                              sx={{
                                width:"100%",
                                height: "100%",
                                objectFit: "fill",
                                borderRadius: 2,
                                bgcolor: "#ebebeb"
                              }}
                              fullWidth
                              image={detailState.image}
                              alt="img"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <br></br>
                            <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#F9F9F9" }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  Price{" "}
                                </Typography>
                                <ListItemText
                                  primary={`U$D ${detailState.price}`}
                                />
                              </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#ebebeb" }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  State{" "}
                                </Typography>
                                <ListItemText primary={detailState.state} />
                              </Typography>
                            </ListItem>
                            <Divider />

                            <ListItem
                              button
                              fullWidth
                              sx={{ bgcolor: "#F9F9F9" }}
                            >
                              <Typography sx={{ wordBreak: "break-word" }}>
                                <Typography variant="subtitle1" color="#1C1C20">
                                  Seller{" "}
                                </Typography>
                                <ListItemText primary={detailState.seller} />
                              </Typography>
                            </ListItem>
                            <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Editorial{" "}
                            </Typography>
                            <ListItemText primary={detailState.editorial} />
                          </Typography>
                        </ListItem>

                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Language{" "}
                            </Typography>
                            <ListItemText primary={detailState.language} />
                          </Typography>
                        </ListItem>

                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Year{" "}
                            </Typography>
                            <ListItemText primary={detailState.year} />
                          </Typography>
                        </ListItem>
                        
                        <Divider />
                          </Grid>
                        </Grid>

                        <br></br>

                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Title{" "}
                            </Typography>
                            <ListItemText primary={detailState.title} />
                          </Typography>
                        </ListItem>
                        <Divider />

                        <ListItem button fullWidth sx={{ bgcolor: "#F9F9F9" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Id{" "}
                            </Typography>
                            <ListItemText primary={detailState._id} />
                          </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem button fullWidth sx={{ bgcolor: "#ebebeb" }}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography variant="subtitle1" color="#1C1C20">
                              Author{" "}
                            </Typography>
                            <ListItemText primary={detailState.author} />
                          </Typography>
                        </ListItem>
                        <Divider />


                      </List>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item sx={{ borderRadius: 4 }}>
                      <br />
                      <br />
                      <Item>
                        <CardElement options={cardStyle} />
                      </Item>
                      <br />
                      <br />
                      <AddressElement
                        options={{ mode: "shipping" }}
                        onChange={(event) => {
                          if (event.complete) {
                            // Extract potentially complete address
                            const address = event.value.address;
                            setAddress(address)
                          }
                        }}
                      />
                      <br />
                      <br />
                      {
                        address&&                
                         <Button
                        disabled={!stripe}
                        type="submit"
                        variant="outlined"
                        sx={{width:200}}
                      >
                        {loading ? (
                          <Box role="status">
                        Loading...
                          </Box>
                        ) : (
                          "Buy"
                        )}
                      </Button>
                      }
     
                    </Item>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function Stripe() {
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

export default Stripe;
