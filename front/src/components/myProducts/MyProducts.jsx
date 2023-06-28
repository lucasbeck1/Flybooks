import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContentText, Grid, ListItem, MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import defaultImage from "../../assets/bookDefault.png";
import { deletePost, getAllBooks, modifyMyPosts, modifyPost } from "../../redux/actions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 10,
  background: "linear-gradient(135deg, #3CAFF5 0%, #013a63 100%)",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  borderRadius: 10,
  background: "linear-gradient(135deg, #3CAFF5 0%, #013a63 100%)",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ebebeb",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));
export default function MyProducts({
  id,
  title,
  image,
  typebook,
  price,
  author,
  categorie,
  editorial,
  saga,
  language,
  gender,
  year,
  state,
  available,
  disable,
  buyers
}) {
  const isActive = useMediaQuery("(max-width:870px)");
  // Only First Mayus
  let titlemod = title.toLowerCase().split(" ").join(" ");
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1, titlemod.length);
  title = titlemod;

  // Max title characters
  const maxLength1 = 60;
  if (title.length > maxLength1) {
    title = title.slice(0, maxLength1) + "...";
  }
  if (saga && saga.length > maxLength1) {
    saga = saga.slice(0, maxLength1) + "...";
  }

  // Max author words
  const maxLength2 = 22;
  if (author.length > maxLength2) {
    author = author.split(" ").slice(0, 2).join(" ");
  }

  //Global States
  const [open, setOpen] = useState(false);
  const allCategories = useSelector((state) => state.categories);
  const allGenders = useSelector((state) => state.genders);
  const allLanguages = useSelector((state) => state.languages);
  // const allproducts = useSelector((state) => state.allbooks);
  // let session = JSON.parse(localStorage.getItem("session"));
  // let aux = allproducts.filter((e) => e.sellerId === session[0].id);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  // console.log(open);
  // Local States
  const [isForm, setIsForm] = useState(false);
  const [input, setInput] = useState({
    title: title,
    author: author,
    editorial: editorial,
    language: language,
    year: year,
    state: state,
    typebook: typebook,
    price: price,
    categorie: categorie,
    gender: gender,
  });
  const [error, setError] = useState({});
  // if (isForm) console.log(input);
  // if (isForm) console.log("formError", error);

  function switchForm(e) {
    e.preventDefault();
    setInput({
      title: title,
      author: author,
      editorial: editorial,
      language: language,
      year: year,
      state: state,
      typebook: typebook,
      price: price,
      categorie: categorie,
      gender: gender,
    });
    // document.getElementById('title').value = title;
    // document.getElementById('author').value = author;
    // document.getElementById('editorial').value = editorial;
    // document.getElementById('year').value = year;
    // document.getElementById('price').value = price;
    isForm ? setIsForm(false) : setIsForm(true);
  }

  function validate(input) {
    let actualYear = new Date().getFullYear();
    let RegEXP = /[`ª!@#$%^*_+=[\]{};"\\|,<>/~]/;
    let err = {};

    if (!input.title) {
      err.title = "· Title is required";
    } else if (RegEXP.test(input.title)) {
      err.title = "· Special characters are not accepted";
    } else if (input.title.length > 200) {
      err.title = "· Title too long";
    } else if (!input.author) {
      err.author = "· Author is required";
    } else if (RegEXP.test(input.author)) {
      err.author = "· Special characters are not accepted";
    } else if (input.author.length > 200) {
      err.author = "· Author name too long";
    } else if (!input.editorial) {
      err.editorial = "· Editorial is required";
    } else if (RegEXP.test(input.editorial)) {
      err.editorial = "· Special characters are not accepted";
    } else if (input.editorial.length > 200) {
      err.editorial = "· Editorial name too long";
    } else if (!input.gender.length) {
      err.gender = "· Select at least one gender";
    } else if (!input.year) {
      err.year = "· Year input is required";
    } else if (input.year < 0 || input.year > actualYear) {
      err.year = "· Year input Error";
    } else if (!input.price || input.price < 0) {
      err.price = "· Price input Error";
    }

    return err;
  }

  function inputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function selectCategorie(e) {
    e.preventDefault();
    setInput({
      ...input,
      categorie: e.target.value,
    });
  }
  function selectGenders(e) {
    e.preventDefault();
    if (!input.gender.includes(e.target.value)) {
      setInput({
        ...input,
        gender: [...input.gender, e.target.value],
      });
      setError(
        validate({
          ...input,
          gender: [...input.gender, e.target.value],
        })
      );
    }
    document.getElementById("GenderSelector").selectedIndex = "DEFAULT";
  }
  function unselectGenders(e) {
    e.preventDefault();
    if (input.gender.includes(e.target.value)) {
      setInput({
        ...input,
        gender: input.gender.filter((gen) => gen !== e.target.value),
      });
      setError(
        validate({
          ...input,
          gender: input.gender.filter((gen) => gen !== e.target.value),
        })
      );
    }
  }
  function SelectLanguage(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: e.target.value,
    });
  }
  function changeState(e) {
    e.preventDefault();
    if (input.state === "New") {
      setInput({
        ...input,
        state: "Used",
      });
    } else {
      setInput({
        ...input,
        state: "New",
      });
    }
  }
  function changeType(e) {
    e.preventDefault();
    if (input.typebook === "physical") {
      setInput({
        ...input,
        typebook: "virtual",
      });
    } else {
      setInput({
        ...input,
        typebook: "physical",
      });
    }
  }
  async function modify(e) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    let sessionId = session[0].id;
    const inputSend = input;

    await dispatch(modifyPost(id, inputSend));
    await dispatch(modifyMyPosts(sessionId, id, inputSend));
    dispatch(getAllBooks());
    setIsForm(false);
  }
  async function deletes(e){
    e.preventDefault();
    await dispatch(deletePost(id));
    dispatch(getAllBooks());
    handleClose();
    return MySwal.fire(`The product has been deleted`, "", "info");
  };
    
  function handleOpen(){
    setOpen(true);
  }
  
  function handleClose(){
    setOpen(false);
  }
  return (
    <React.Fragment>
      {isActive?<Box >
        {isForm ? (
        <Box
          key={id}
          component="main"
          sx={{ bgcolor:"#fff",mb:2 }}
        >
                            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
            <DialogContentText sx={{ padding: 2,mt:2 , textAlign: "center"}} variant={'h6'}>
            Do you want to delete this item permanently?
  </DialogContentText>
  <Button color="error" sx={{m:3}} variant="outlined" onClick={e=> deletes(e) }>Confirm Delete</Button>
            </Dialog>
            <Grid sx={{ bgcolor: "#fff" }} item xs={12}>
            <Item>
              <Grid >
                <Grid item xs={4} component="main" sx={{ mt: 5.5, padding: 2}}>
                  <Item3>
                  
                    <CardMedia
                      display="flex"
                      justify="center"
                      component="img"
                      sx={{
                        width: "12rem",
                        height: "13rem",
                        objectFit: "fill",
                        borderRadius: 2,
                        bgcolor: "#ebebeb",
                        ml: "10%",
                        mb: "2%",
                      }}
                      fullWidth
                      image={image ? image : defaultImage}
                      alt="Book"
                    />
                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "#fff",
                        ":hover": {
                          background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        {available ? (
                          <Box color="#000">Available: Yes</Box>
                        ) : (
                          <Box color="#000">Available: No</Box>
                        )}
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                       "#fff",
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#000"
                        ></Typography>
                        <Box color="#000">
                          {" "}
                          State :{" "}
                          {input.state === "New" ? (
                            <>
                              <Button size="small"   disabled>New</Button>
                              <Button size="small" onClick={(e) => changeState(e)}>
                                Used
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="small"onClick={(e) => changeState(e)}>
                                New
                              </Button>
                              <Button size="small" disabled>Used</Button>
                            </>
                          )}
                        </Box>
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "#fff",
                      
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#000">
                          Language :{" "}
                          <Select sx={{height:30,width:120}}
                            onChange={(e) => SelectLanguage(e)}
                            defaultValue={language}
                          >
                            <MenuItem value="DEFAULT" disabled>
                              Languages
                            </MenuItem>
                            {allLanguages?.map((lan) => {
                              return <MenuItem value={lan}>{lan}</MenuItem>;
                            })}
                          </Select>
                        </Box>
                      </Typography>
                    </ListItem>
                    <br></br>
                    <div>
                      {available ? (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                            m: 1,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                            m: 1,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Enable
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          fontFamily: "Verdana",
                          width: "30%",
                          fontSize: 10,
                          m: 1,
                        }}
                        value={id}
                        onClick={(e) => handleOpen(e)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          fontFamily: "Verdana",
                          fontSize: 10,
                          color: "#ED2A59",
                          borderColor: "#ED2A59",
                          width: "30%",
                          ":hover": {
                            borderColor: "#ED2A59",
                          },
                          m: 1,
                        }}
                        value={id}
                        onClick={(e) => switchForm(e)}
                      >
                        Cancel
                      </Button>
                      {Object.values(error).length ? (
                        <span>{Object.values(error)[0]}</span>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#34C6BD",
                            borderColor: "#34C6BD",
                            fontFamily: "Verdana",
                            fontSize: 10,
                            width: "30%",
                            m: 1,
                            ":hover": {
                              borderColor: "#34C6BD",
                            },
                          }}
                          value={id}
                          onClick={(e) => modify(e)}
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  </Item3>
                </Grid>
                <Grid item xs={8}  sx={{ mt: 4 }}>
                  <Item2>
                    <Grid  spacing={4}>
                      <Grid item xs={6} >
                        <Item3 sx={{ borderRadius: 4 }}>
                        <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Year :{" "}
                                <TextField
                                 size="small"
                                  id="year"
                                  type="number"
                                  name="year"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={year}
                                  step="1"
                                />
                              </Box>
                            </Typography>
                          </ListItem>

                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Type :{" "}
                                {input.typebook === "physical" ? (
                                  <>
                                    <Button size="small"   disabled>Physical</Button>
                                    <Button  size="small" onClick={(e) => changeType(e)}>
                                      Virtual
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button size="small" onClick={(e) => changeType(e)}>
                                      Physical
                                    </Button>
                                    <Button  size="small" disabled>Virtual</Button>
                                  </>
                                )}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Price : U$D
                                <TextField
                                 size="small"
                                  id="price"
                                  type="number"
                                  step="0.01"
                                  name="price"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={price}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Title :{" "}
                                <TextField
                                 size="small"
                                  id="title"
                                  type="text"
                                  name="title"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={title}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Category :{" "}
                                <Select
                                 sx={{height:30,width:120}}
                                  onChange={(e) => selectCategorie(e)}
                                  defaultValue={categorie}
                                >
                                  <MenuItem value="DEFAULT" disabled>
                                    Categories
                                  </MenuItem>
                                  {allCategories?.map((cat) => {
                                    return (
                                      <MenuItem value={cat}>{cat}</MenuItem>
                                    );
                                  })}
                                </Select>
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {input.gender.length > 2 ? (
                                  <Box>
                                    <span>Select Genders: </span>

                                    {input.gender?.map((gen) => {
                                      return (
                                        <Button
                                          variant="outlined"
                                          sx={{
                                            color: "#34C6BD",
                                            borderColor: "#34C6BD",

                                            fontSize: 10,
                                            width: "50%",
                                            m: 1,
                                            ":hover": {
                                              color: "#ED2A59",
                                              borderColor: "#ED2A59",
                                            },
                                          }}
                                          value={gen}
                                          onClick={(e) => unselectGenders(e)}
                                        >
                                          {gen}
                                        </Button>
                                      );
                                    })}
                                  </Box>
                                ) : (
                                  <Box>
                                    Genders : {""}
                                    <Select
                                        sx={{height:30,width:120}}
                                      id="GenderSelector"
                                      onChange={(e) => selectGenders(e)}
                                      defaultValue="DEFAULT"
                                    >
                                      <MenuItem value="DEFAULT" disabled>
                                        Genders
                                      </MenuItem>
                                      {allGenders?.map((gen) => {
                                        return (
                                          <MenuItem value={gen}>{gen}</MenuItem>
                                        );
                                      })}
                                    </Select>
                                    <span>Select Genders: </span>
                                    {input.gender?.map((gen) => {
                                      return (
                                        <Button
                                          variant="outlined"
                                          sx={{
                                            color: "#34C6BD",
                                            borderColor: "#34C6BD",

                                            fontSize: 10,
                                            width: "50%",
                                            m: 1,
                                            ":hover": {
                                              color: "#ED2A59",
                                              borderColor: "#ED2A59",
                                            },
                                          }}
                                          value={gen}
                                          onClick={(e) => unselectGenders(e)}
                                        >
                                          {gen}
                                        </Button>
                                      );
                                    })}
                                  </Box>
                                )}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000"
                              >
                                Author :{" "}
                                <TextField
                                 size="small"
                                  id="author"
                                  type="text"
                                  name="author"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={author}
                                />
                              </Box>
                            </Typography>
                          </ListItem>

                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Editorial :
                                <TextField
                                 size="small"
                                  id="editorial"
                                  type="text"
                                  name="editorial"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={editorial}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                        </Item3>
                      </Grid>


                    </Grid>
                  </Item2>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Box>
      ) : (
        <Box
          key={id}
          component="main"
          sx={{ bgcolor: "#fff",mb:2}}
        >
           <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
            <DialogContentText sx={{ padding: 2,mt:2 , textAlign: "center"}} variant={'h6'}>
            Do you want to delete this item permanently?
  </DialogContentText>
  <Button color="error" sx={{m:3}} variant="outlined" onClick={e=> deletes(e) }>Confirm Delete</Button>
            </Dialog>
            <Grid   sx={{ bgcolor: "#fff" }} item xs={12}>
            <Item>
             
             <Grid item xs={12}>
             <Grid container>             
             <Grid  item xs={6}>                    
             <CardMedia
                      display="flex"
                      justify="center"
                      component="img"
                      sx={{
                        width: "12rem",
                        height: "13rem",
                        objectFit: "fill",
                        borderRadius: 2,
                        bgcolor: "#ebebeb",
                        ml: "10%",
                        mb: "2%",
                      }}
                      fullWidth
                      image={image ? image : defaultImage}
                      alt="Book"
                    /> 
                    </Grid>
                    {/* {console.log(buyers.length)} */}
                    {buyers.length<1?             
                    <Grid  item xs={1} sx={{ml:6,mt:2}}>  
                      {available ? (
                        <Button
                          variant="contained"
                          sx={{
                            fontFamily: "Verdana",
                            width: 100,
                            m:1
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            fontFamily: "Verdana",
                            width: 100,
                            m:1
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Enable
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          fontFamily: "Verdana",
                          width: 100,
                          m:1
                        }}
                        value={id}
                        onClick={(e) => handleOpen(e)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color= "success"
                        sx={{
                          fontFamily: "Verdana",
                         
                          width: 100,
                          m:1
                         
                        }}
                        value={id}
                        onClick={(e) => switchForm(e)}
                      >
                        Modify
                      </Button>
                    </Grid> : 
                    
                       <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                        "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                      ":hover": {
                        background:
                          "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                      },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF"> Buyer : {buyers[0].username}</Box>
                      </Typography>
                    </ListItem>
}
                    </Grid>
             </Grid>
         

              

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                        "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                      ":hover": {
                        background:
                          "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                      },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        {available ? (
                          <Box color="#FFF">Available: Yes</Box>
                        ) : (
                          <Box color="#FFF">Available: No</Box>
                        )}
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                        "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                      ":hover": {
                        background:
                          "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                      },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF"> State : {state}</Box>
                      </Typography>
                    </ListItem>
                
                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                        "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                      ":hover": {
                        background:
                          "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                      },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF">Language : {language}</Box>
                      </Typography>
                    </ListItem>
                    <br></br>
                 
                    <Grid item xs={8} sx={{ mt: 5.5 }}>
                
                    
                      
                        <Item3 sx={{ borderRadius: 4 }}>
                        <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Year : {year}</Box>
                            </Typography>
                          </ListItem>

                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Type : {typebook}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Price : {price}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Title : {title}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Category : {categorie}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">
                                Genders : {gender?.join(", ")}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Author : {author}</Box>
                            </Typography>
                          </ListItem>

                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Editorial : {editorial}</Box>
                            </Typography>
                          </ListItem>
                        </Item3>
                    

          
                     
                   
                  
                </Grid>
              
            </Item>
          </Grid>
       
        </Box>
      )}
      </Box> :
      <Box>     
         {isForm ? 
         (
        <Box
          key={id}
          component="main"
          sx={{ bgcolor:"#fff", height: "110vh" }}
        >
                            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
            <DialogContentText sx={{ padding: 2,mt:2 , textAlign: "center"}} variant={'h6'}>
            Do you want to delete this item permanently?
  </DialogContentText>
  <Button color="error" sx={{m:3}} variant="outlined" onClick={e=> deletes(e) }>Confirm Delete</Button>
            </Dialog>
            <Grid item xs={12}>
            <Item>
              <Grid container>
                <Grid item xs={4} component="main" sx={{ mt: 5.5, padding: 2}}>
                  <Item3>
                    <CardMedia
                      display="flex"
                      justify="center"
                      component="img"
                      sx={{
                        width: "12rem",
                        height: "13rem",
                        objectFit: "fill",
                        borderRadius: 2,
                        bgcolor: "#ebebeb",
                        ml: "10%",
                        mb: "2%",
                      }}
                      fullWidth
                      image={image ? image : defaultImage}
                      alt="Book"
                    />
                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "#fff",
                        ":hover": {
                          background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        {available ? (
                          <Box color="#000">Available: Yes</Box>
                        ) : (
                          <Box color="#000">Available: No</Box>
                        )}
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                       "#fff",
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#000"
                        ></Typography>
                        <Box color="#000">
                          {" "}
                          State :{" "}
                          {input.state === "New" ? (
                            <>
                              <Button size="small"   disabled>New</Button>
                              <Button size="small" onClick={(e) => changeState(e)}>
                                Used
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="small"onClick={(e) => changeState(e)}>
                                New
                              </Button>
                              <Button size="small" disabled>Used</Button>
                            </>
                          )}
                        </Box>
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "#fff",
                      
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#000">
                          Language :{" "}
                          <Select sx={{height:30,width:120}}
                            onChange={(e) => SelectLanguage(e)}
                            defaultValue={language}
                          >
                            <MenuItem value="DEFAULT" disabled>
                              Languages
                            </MenuItem>
                            {allLanguages?.map((lan) => {
                              return <MenuItem value={lan}>{lan}</MenuItem>;
                            })}
                          </Select>
                        </Box>
                      </Typography>
                    </ListItem>
                    <br></br>
                    <div>
                      {available ? (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                            m: 1,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                            m: 1,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Enable
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          fontFamily: "Verdana",
                          width: "30%",
                          fontSize: 10,
                          m: 1,
                        }}
                        value={id}
                        onClick={(e) => handleOpen(e)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          fontFamily: "Verdana",
                          fontSize: 10,
                          color: "#ED2A59",
                          borderColor: "#ED2A59",
                          width: "30%",
                          ":hover": {
                            borderColor: "#ED2A59",
                          },
                          m: 1,
                        }}
                        value={id}
                        onClick={(e) => switchForm(e)}
                      >
                        Cancel
                      </Button>
                      {Object.values(error).length ? (
                        <span>{Object.values(error)[0]}</span>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#34C6BD",
                            borderColor: "#34C6BD",
                            fontFamily: "Verdana",
                            fontSize: 10,
                            width: "30%",
                            m: 1,
                            ":hover": {
                              borderColor: "#34C6BD",
                            },
                          }}
                          value={id}
                          onClick={(e) => modify(e)}
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  </Item3>
                </Grid>
                <Grid item xs={8}  sx={{ mt: 4 }}>
                  <Item2>
                    <Grid container spacing={4}>
                      <Grid item xs={6} >
                        <Item3 sx={{ borderRadius: 4 }}>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Category :{" "}
                                <Select
                                 sx={{height:30,width:120}}
                                  onChange={(e) => selectCategorie(e)}
                                  defaultValue={categorie}
                                >
                                  <MenuItem value="DEFAULT" disabled>
                                    Categories
                                  </MenuItem>
                                  {allCategories?.map((cat) => {
                                    return (
                                      <MenuItem value={cat}>{cat}</MenuItem>
                                    );
                                  })}
                                </Select>
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {input.gender.length > 2 ? (
                                  <Box>
                                    <span>Select Genders: </span>

                                    {input.gender?.map((gen) => {
                                      return (
                                        <Button
                                          variant="outlined"
                                          sx={{
                                            color: "#34C6BD",
                                            borderColor: "#34C6BD",

                                            fontSize: 10,
                                            width: "50%",
                                            m: 1,
                                            ":hover": {
                                              color: "#ED2A59",
                                              borderColor: "#ED2A59",
                                            },
                                          }}
                                          value={gen}
                                          onClick={(e) => unselectGenders(e)}
                                        >
                                          {gen}
                                        </Button>
                                      );
                                    })}
                                  </Box>
                                ) : (
                                  <Box>
                                    Genders : {""}
                                    <Select
                                        sx={{height:30,width:120}}
                                      id="GenderSelector"
                                      onChange={(e) => selectGenders(e)}
                                      defaultValue="DEFAULT"
                                    >
                                      <MenuItem value="DEFAULT" disabled>
                                        Genders
                                      </MenuItem>
                                      {allGenders?.map((gen) => {
                                        return (
                                          <MenuItem value={gen}>{gen}</MenuItem>
                                        );
                                      })}
                                    </Select>
                                    <span>Select Genders: </span>
                                    {input.gender?.map((gen) => {
                                      return (
                                        <Button
                                          variant="outlined"
                                          sx={{
                                            color: "#34C6BD",
                                            borderColor: "#34C6BD",

                                            fontSize: 10,
                                            width: "50%",
                                            m: 1,
                                            ":hover": {
                                              color: "#ED2A59",
                                              borderColor: "#ED2A59",
                                            },
                                          }}
                                          value={gen}
                                          onClick={(e) => unselectGenders(e)}
                                        >
                                          {gen}
                                        </Button>
                                      );
                                    })}
                                  </Box>
                                )}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000"
                              >
                                Author :{" "}
                                <TextField
                                 size="small"
                                  id="author"
                                  type="text"
                                  name="author"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={author}
                                />
                              </Box>
                            </Typography>
                          </ListItem>

                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Editorial :
                                <TextField
                                 size="small"
                                  id="editorial"
                                  type="text"
                                  name="editorial"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={editorial}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                        </Item3>
                      </Grid>

                      <Grid item xs={6}>
                        <Item3 sx={{ borderRadius: 4 }}>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Year :{" "}
                                <TextField
                                 size="small"
                                  id="year"
                                  type="number"
                                  name="year"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={year}
                                  step="1"
                                />
                              </Box>
                            </Typography>
                          </ListItem>

                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Type :{" "}
                                {input.typebook === "physical" ? (
                                  <>
                                    <Button size="small"   disabled>Physical</Button>
                                    <Button  size="small" onClick={(e) => changeType(e)}>
                                      Virtual
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button size="small" onClick={(e) => changeType(e)}>
                                      Physical
                                    </Button>
                                    <Button  size="small" disabled>Virtual</Button>
                                  </>
                                )}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                {" "}
                                Price : U$D
                                <TextField
                                 size="small"
                                  id="price"
                                  type="number"
                                  step="0.01"
                                  name="price"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={price}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background: "#fff",
                              borderRadius: 2,
                              height: "20%",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#000">
                                Title :{" "}
                                <TextField
                                 size="small"
                                  id="title"
                                  type="text"
                                  name="title"
                                  onChange={(e) => inputChange(e)}
                                  placeholder={title}
                                />
                              </Box>
                            </Typography>
                          </ListItem>
                        </Item3>
                      </Grid>
                    </Grid>
                  </Item2>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Box>
      ) : (
        <Box
          key={id}
          component="main"
          sx={{ bgcolor: "#fff", height: "90vh" }}
        >
                  <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
            <DialogContentText sx={{ padding: 2,mt:2 , textAlign: "center"}} variant={'h6'}>
            Do you want to delete this item permanently?
  </DialogContentText>
  <Button color="error" sx={{m:3}} variant="outlined" onClick={e=> deletes(e) }>Confirm Delete</Button>
            </Dialog>
            <Grid   sx={{ bgcolor: "#fff" }} item xs={12}>
            <Item>
              <Grid container>
                <Grid item xs={4} sx={{ padding: 2 }}>
                  <Item3>
                    <CardMedia
                      display="flex"
                      justify="center"
                      component="img"
                      sx={{
                        width: "12rem",
                        height: "13rem",
                        objectFit: "fill",
                        borderRadius: 2,
                        bgcolor: "#ebebeb",
                        ml: "10%",
                        mb: "2%",
                      }}
                      fullWidth
                      image={image ? image : defaultImage}
                      alt="Book"
                    />
                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg,  #006ba6 0%,  #013a63 90%)",
                        ":hover": {
                          background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        {available ? (
                          <Box color="#FFF">Available: Yes</Box>
                        ) : (
                          <Box color="#FFF">Available: No</Box>
                        )}
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg, #006ba6 0%,  #013a63 90%)",
                        ":hover": {
                          background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF"> State : {state}</Box>
                      </Typography>
                    </ListItem>

                    <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg,  #006ba6 0%,  #013a63 90%)",
                        ":hover": {
                          background:
                            "linear-gradient(135deg, #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF">Language : {language}</Box>
                      </Typography>
                    </ListItem>
               
                    {buyers.length<1?  
                        
                       <div>
                         <br></br>       
                      {available ? (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Verdana",
                            width: "30%",
                            fontSize: 10,
                          }}
                          value={id}
                          onClick={(e) => disable(e)}
                        >
                          Enable
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          fontFamily: "Verdana",
                          width: "30%",
                          fontSize: 10,
                        }}
                        value={id}
                        onClick={(e) => handleOpen(e)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          fontFamily: "Verdana",
                          fontSize: 10,
                          color: "#2BCA35",
                          borderColor: "#2BCA35",
                          width: "30%",
                        }}
                        value={id}
                        onClick={(e) => switchForm(e)}
                      >
                        Modify
                      </Button>
                    </div> 
                    : 
                    
                       <ListItem
                      button
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg, #006ba6 0%,  #013a63 90%)",
                        ":hover": {
                          background:
                            "linear-gradient(135deg,  #006ba6 0%, #013a63 100%)",
                        },
                        borderRadius: 2,
                        mt: 1,
                      }}
                    >
                      <Typography sx={{ wordBreak: "break-word" }}>
                        <Typography
                          variant="subtitle1"
                          color="#FFF"
                        ></Typography>
                        <Box color="#FFF"> Buyer : {buyers[0].username}</Box>
                      </Typography>
                    </ListItem>
                    
                     }
                  
                  </Item3>
                </Grid>
                <Grid item xs={8} sx={{ mt: 5.5 }}>
                  <Item2>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                      <Item3>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Category : {categorie}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">
                                Genders : {gender?.join(", ")}
                              </Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Author : {author}</Box>
                            </Typography>
                          </ListItem>

                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Editorial : {editorial}</Box>
                            </Typography>
                          </ListItem>
                          </Item3>
                      </Grid>

                      <Grid item xs={6}>
                      <Item3>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Year : {year}</Box>
                            </Typography>
                          </ListItem>

                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Type : {typebook}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>
                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                              "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                            ":hover": {
                              background:
                                "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                            },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF"> Price : {price}</Box>
                            </Typography>
                          </ListItem>
                          <br></br>

                          <ListItem
                            button
                            fullWidth
                            sx={{
                              background:
                                "linear-gradient(135deg, #3CAFF5 0%,  #013a63 90%)",
                              ":hover": {
                                background:
                                  "linear-gradient(135deg, #013a63 0%, #3CAFF5 100%)",
                              },
                              borderRadius: 2,
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              <Typography
                                variant="subtitle1"
                                color="#FFF"
                              ></Typography>
                              <Box color="#FFF">Title : {title}</Box>
                            </Typography>
                          </ListItem>
                          </Item3>
                      </Grid>
                    </Grid>
                  </Item2>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Box>
      )
      }</Box>}

    </React.Fragment>
  );
}
 
 