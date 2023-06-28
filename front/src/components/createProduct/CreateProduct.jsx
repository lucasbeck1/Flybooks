import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button, Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  clearImage, createPost,
  getCategories, getGenders, getLanguages, startUploadingFile
} from "../../redux/actions";
import CreateProductPreview from "../createProductPreview/CreateProductPreview";
import Header from "../header/Header";
import "./CreateProduct.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CreatePost() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const languages = useSelector((state) => state.languages);
  const genders = useSelector((state) => state.genders);
  let image_c = useSelector((state) => state.images);
  const [err, setErr] = useState({});
  const MySwal = withReactContent(Swal);
  const [order, SetOrder] = useState("");
  // const [loading, setLoading] = useState(false);

  let username = JSON.parse(localStorage.getItem("session"));
  const isActive=useMediaQuery("(max-width:600px)")
  const [input, setInput] = useState({
    title: "",
    author: "",
    editorial: "",
    saga: "",
    image: "",
    year: 0,
    price: 0,
    typebook: "",
    state: "",
    language: "",
    categorie: "",
    gender: [],
    seller: username[0].username,
    sellerId: username[0].id,
  });
  // console.log(input);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLanguages());
    dispatch(getGenders());
  }, [dispatch]);

  const fileInputRef = useRef();

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErr(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handlerSelectCategorie(e) {
    e.preventDefault();

    setInput({
      ...input,
      categorie: e.target.value,
    });
  }
  function handlerSelectGenders(e) {
    e.preventDefault();
    setInput({
      ...input,
      gender: [...input.gender, e.target.value],
    });
  }

  function handlerSelectLanguage(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: e.target.value,
    });
  }
  function handlerSelectTypeBook(e) {
    e.preventDefault();
    setInput({
      ...input,
      typebook: e.target.value,
    });
  }

  function handlerSelectState(e) {
    e.preventDefault();
    setInput({
      ...input,
      state: e.target.value,
    });
  }

  function handlerSubmit(e, message) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    input.image = image_c;
    dispatch(createPost(session[0].id, input));
    // dispatch(createPost(input));
    dispatch(clearImage());
    setInput({
      title: "",
      author: "",
      categorie: "",
      editorial: "",
      saga: "",
      language: "",
      image: "",
      price: 0,
      year: 0,
      state: "",
      typebook: "",
      gender: [],
      seller: username[0].username,
      sellerId: username[0].id,
    });

    navigate("/");
    return MySwal.fire(
      "¡The post has been created successfully!",
      message,
      "success"
    );
  }
  function validate(input) {
    let fecha = new Date();
    let añoActual = fecha.getFullYear();
    // console.log(añoActual);
    let RegEXP = /[`ª!@#$%^*_+=[\]{};"\\|,<>/~]/;
    let err = {};
    if (!input.title) {
      err.title = "· Title is required";
    } else if (RegEXP.test(input.title)) {
      err.title = "· Special characters are not accepted";
    } else if (!input.author) {
      err.author = "· Author is required";
    } else if (RegEXP.test(input.author)) {
      err.author = "· Special characters are not accepted";
    } else if (!input.editorial) {
      err.editorial = "· Editorial is required";
    } else if (image_c.length < 1) {
      err.image = "· Image required";
    } else if (RegEXP.test(input.editorial)) {
      err.editorial = "· Special characters are not accepted";
    } else if (!input.year) {
      err.year = "· Year input is required";
    } else if (input.year < 0 || input.year > añoActual) {
      err.year = "· Year input Error";
    } else if (!input.price || input.price < 0) {
      err.price = "· Price input Error";
    }
    // console.log(err);
    SetOrder("");
    err.input = "· Input required";
    return err;
  }
  function handleDelete(el) {
    setInput({
      ...input,
      gender: input.gender.filter((e) => e !== el),
    });
  }

  // const changeState = () => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 3000);
  // };
  // if (!loading) {
  //   changeState();
  //   return <Loader />;
  // }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFile(target.files));
  };






  return (
   
    <Box component="main" sx={{bgcolor: '#013a63',height:"100vh"}} >
       <Header noSearch={true} />
      {isActive ? <Box sx={{padding:2,bgcolor: '#013a63'}} >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box component="main" sx={{bgcolor: '#013a63'}} >
        <Grid  spacing={4} >
          <Grid item xs={5}>
            <Item  sx={{borderRadius:4}}>
              <CreateProductPreview input={input} />
            </Item>
          </Grid>
          <br/>
          
          <Grid item xs={7}>
            <Item  sx={{borderRadius:4}}>
              {" "}
              <form onSubmit={(e) => handlerSubmit(e)}>
                <Grid container spacing={3}>
                  <Grid item xs={5.5}>
                    <Box>
                      {err.title ? (
                        <Box>
                          <InputLabel>Title</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Title"
                            helperText={err.title}
                            variant="filled"
                            placeholder="Title"
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Title</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Title"
                            variant="filled"
                            placeholder="Title"
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {" "}
                      {err.author ? (
                        <Box>
                          {" "}
                          <InputLabel>Author</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Author"
                            helperText={err.author}
                            variant="filled"
                            placeholder="Author"
                            type="text"
                            value={input.author}
                            name="author"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel>Author</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Author"
                            variant="filled"
                            placeholder="Author"
                            type="text"
                            value={input.author}
                            name="author"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {err.editorial ? (
                        <Box>
                          {" "}
                          <InputLabel>Editorial</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Editorial"
                            helperText={err.editorial}
                            variant="filled"
                            placeholder="Editorial"
                            type="text"
                            value={input.editorial}
                            name="editorial"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Editorial</InputLabel>

                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Editorial"
                            variant="filled"
                            placeholder="Editorial"
                            type="text"
                            value={input.editorial}
                            name="editorial"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                      <InputLabel>Saga</InputLabel>

                      <TextField
                        fullWidth
                        id="filled-basic"
                        label="Saga"
                        variant="filled"
                        placeholder="Saga"
                        type="text"
                        value={input.saga}
                        name="saga"
                        onChange={handlerChange}
                      />
                    </Box>

                    <Box>
                      <InputLabel>Image</InputLabel>

                      <input
                        style={{ display: "none" }}
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                      />

                      <IconButton
                        className={
                          image_c.length > 0
                            ? "buttonFormImg"
                            : "buttonFormImgErr"
                        }
                        onClick={() => fileInputRef.current.click()}
                      >
                        <UploadOutlined />
                      </IconButton>
                    </Box>
                    <Box>
                      {err.year ? (
                        <Box>
                          {" "}
                          <InputLabel>Year</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Year"
                            helperText={err.year}
                            variant="filled"
                            placeholder="year"
                            type="number"
                            value={input.year}
                            name="year"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Year</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="year"
                            variant="filled"
                            placeholder="year"
                            type="number"
                            value={input.year}
                            name="year"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {err.price ? (
                        <Box>
                          <InputLabel>Price</InputLabel>

                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Price"
                            helperText={err.price}
                            variant="filled"
                            placeholder="price"
                            type="number"
                            value={input.price}
                            name="price"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel>Price</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="price"
                            variant="filled"
                            placeholder="price"
                            type="number"
                            value={input.price}
                            name="price"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={5.5}>
                    <Box>
                      {!input.typebook ? (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-filled-label-tb">
                            Type Book
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-filled-label-tb"
                            variant="filled"
                            fullWidth
                            value={input.typebooks}
                            name="typebook"
                            defaultValue="type"
                            onChange={(e) => handlerSelectTypeBook(e)}
                          >
                            <MenuItem disabled value="type">
                              Type Book
                            </MenuItem>

                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="virtual"> Virtual</MenuItem>
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-filled-label-tb">
                            Type Book
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label-tb"
                            id="demo-simple-select-filled"
                            variant="filled"
                            fullWidth
                            value={input.typebooks}
                            name="typebook"
                            defaultValue="type"
                            onChange={(e) => handlerSelectTypeBook(e)}
                          >
                            <MenuItem disabled value="type">
                              Type Book
                            </MenuItem>

                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="virtual"> Virtual</MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {!input.state ? (
                        <Box>
                          <InputLabel id="demo-simple-select-label-state">
                            State
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-label-state"
                            variant="filled"
                            fullWidth
                            value={input.states}
                            label="State"
                            defaultValue="state"
                            onChange={(e) => handlerSelectState(e)}
                          >
                            <MenuItem disabled value="state">
                              State
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem
                              disabled={
                                input.typebook === "virtual" ? true : false
                              }
                              value="Used"
                            >
                              Used
                            </MenuItem>
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-state">
                            State
                          </InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-state"
                            id="demo-simple-select"
                            value={input.states}
                            label="languages"
                            defaultValue="state"
                            onChange={(e) => handlerSelectState(e)}
                          >
                            <MenuItem disabled value="state">
                              State
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem
                              disabled={
                                input.typebook === "virtual" ? true : false
                              }
                              value="Used"
                            >
                              Used
                            </MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {!input.language ? (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-languages">
                            Languages
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-label-languages"
                            variant="filled"
                            fullWidth
                            value={input.languages}
                            label="languages"
                            defaultValue="languages"
                            onChange={(e) => handlerSelectLanguage(e)}
                          >
                            <MenuItem disabled value="languages">
                              Languages
                            </MenuItem>
                            {languages.map((e) => (
                              <MenuItem
                                disabled={
                                  input.language.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-languages">
                            Languages
                          </InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-languages"
                            id="demo-simple-select"
                            value={input.languages}
                            label="languages"
                            defaultValue="languages"
                            onChange={(e) => handlerSelectLanguage(e)}
                          >
                            <MenuItem disabled value="languages">
                              Languages
                            </MenuItem>
                            {languages.map((e) => (
                              <MenuItem
                                disabled={
                                  input.language.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}
                    </Box>
                    {!input.categorie ? (
                      <Box>
                        <InputLabel id="demo-simple-select-label-cat">
                          Categories
                        </InputLabel>
                        <Select
                          error
                          id="demo-simple-select"
                          helperText={err.input}
                          labelId="demo-simple-select-label-cat"
                          variant="filled"
                          fullWidth
                          value={input.categories}
                          label="Categories"
                          defaultValue="choose"
                          onChange={(e) => handlerSelectCategorie(e)}
                        >
                          <MenuItem disabled value="choose">
                            Categories
                          </MenuItem>
                          {categories.map((e) => (
                            <MenuItem
                              disabled={
                                input.categorie.includes(e) === false
                                  ? false
                                  : true
                              }
                              value={e}
                            >
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    ) : (
                      <Box>
                        {" "}
                        <InputLabel id="demo-simple-select-label-cat">
                          Categories
                        </InputLabel>
                        <Select
                          variant="filled"
                          fullWidth
                          labelId="demo-simple-select-label-cat"
                          id="demo-simple-select"
                          value={input.categories}
                          label="Categories"
                          defaultValue="choose"
                          onChange={(e) => handlerSelectCategorie(e)}
                        >
                          <MenuItem disabled value="choose">
                            Categories
                          </MenuItem>
                          {categories.map((e) => (
                            <MenuItem
                              disabled={
                                input.categorie.includes(e) === false
                                  ? false
                                  : true
                              }
                              value={e}
                            >
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}

                    <Box>
                      {!input.gender.length ? (
                        <Box>
                          <InputLabel id="demo-simple-select-label-genders">
                            Genders
                          </InputLabel>

                          <Select
                            error
                            fullWidth
                            id="demo-simple-select"
                            helperText={err.input}
                            labelId="demo-simple-select-label-genders"
                            variant="filled"
                            defaultValue="choose"
                            onChange={(e) => handlerSelectGenders(e)}
                            value={input.genders}
                            label="Genders"
                          >
                            <MenuItem disabled value="choose">
                              Genders
                            </MenuItem>
                            {genders.map((e) => (
                              <MenuItem
                                disabled={
                                  input.gender.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel id="demo-simple-select-label-genders">
                            Genders
                          </InputLabel>

                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-genders"
                            id="demo-simple-select"
                            defaultValue="choose"
                            onChange={(e) => handlerSelectGenders(e)}
                            value={input.genders}
                            label="Genders"
                          >
                            <MenuItem disabled value="choose">
                              Genders
                            </MenuItem>
                            {genders.map((e) => (
                              <MenuItem
                                disabled={
                                  input.gender.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}
                    </Box>
                    <br />
                    <br />
                    <Box>
                      <InputLabel>Choosen Genders</InputLabel>
                      <Box className="genders">
                        {input.gender.map((e) => (
                          <Box
                            className="choosenGenders2"
                            onClick={() => handleDelete(e)}
                          >
                            {e}{" "}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <br />
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={
                        !input.title ||
                        err.title ||
                        err.author ||
                        err.editorial ||
                        err.year ||
                        err.price ||
                        !input.typebook ||
                        !input.state ||
                        !input.language ||
                        !input.categorie
                          ? true
                          : false
                      }
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Item>
          </Grid>
        </Grid>
      </Box>
      </Box>
       : 

      <Box sx={{padding:2,bgcolor: '#013a63'}} >
       {/* <Header noSearch={true} /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Box component="main" sx={{bgcolor: '#013a63'}} >
        <Grid container spacing={2} >
          <Grid item xs={5} >
            <Item sx={{borderRadius:4}}>
              <CreateProductPreview input={input} />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item  sx={{borderRadius:4}}>
              {" "}
              <form onSubmit={(e) => handlerSubmit(e)}>
                <Grid container spacing={3}>
                  <Grid item xs={5.5}>
                    <Box>
                      {err.title ? (
                        <Box>
                          <InputLabel>Title</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Title"
                            helperText={err.title}
                            variant="filled"
                            placeholder="Title"
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Title</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Title"
                            variant="filled"
                            placeholder="Title"
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {" "}
                      {err.author ? (
                        <Box>
                          {" "}
                          <InputLabel>Author</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Author"
                            helperText={err.author}
                            variant="filled"
                            placeholder="Author"
                            type="text"
                            value={input.author}
                            name="author"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel>Author</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Author"
                            variant="filled"
                            placeholder="Author"
                            type="text"
                            value={input.author}
                            name="author"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {err.editorial ? (
                        <Box>
                          {" "}
                          <InputLabel>Editorial</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Editorial"
                            helperText={err.editorial}
                            variant="filled"
                            placeholder="Editorial"
                            type="text"
                            value={input.editorial}
                            name="editorial"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Editorial</InputLabel>

                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Editorial"
                            variant="filled"
                            placeholder="Editorial"
                            type="text"
                            value={input.editorial}
                            name="editorial"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                      <InputLabel>Saga</InputLabel>

                      <TextField
                        fullWidth
                        id="filled-basic"
                        label="Saga"
                        variant="filled"
                        placeholder="Saga"
                        type="text"
                        value={input.saga}
                        name="saga"
                        onChange={handlerChange}
                      />
                    </Box>

                    <Box>
                      <InputLabel>Image</InputLabel>

                      <input
                        style={{ display: "none" }}
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                      />

                      <IconButton
                        className={
                          image_c.length > 0
                            ? "buttonFormImg"
                            : "buttonFormImgErr"
                        }
                        onClick={() => fileInputRef.current.click()}
                      >
                        <UploadOutlined />
                      </IconButton>
                    </Box>
                    <Box>
                      {err.year ? (
                        <Box>
                          {" "}
                          <InputLabel>Year</InputLabel>
                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Year"
                            helperText={err.year}
                            variant="filled"
                            placeholder="year"
                            type="number"
                            value={input.year}
                            name="year"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel>Year</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="year"
                            variant="filled"
                            placeholder="year"
                            type="number"
                            value={input.year}
                            name="year"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {err.price ? (
                        <Box>
                          <InputLabel>Price</InputLabel>

                          <TextField
                            fullWidth
                            error
                            id="outlined-error-helper-text"
                            label="Price"
                            helperText={err.price}
                            variant="filled"
                            placeholder="price"
                            type="number"
                            value={input.price}
                            name="price"
                            onChange={handlerChange}
                          />
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel>Price</InputLabel>
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="price"
                            variant="filled"
                            placeholder="price"
                            type="number"
                            value={input.price}
                            name="price"
                            onChange={handlerChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={5.5}>
                    <Box>
                      {!input.typebook ? (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-filled-label-tb">
                            Type Book
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-filled-label-tb"
                            variant="filled"
                            fullWidth
                            value={input.typebooks}
                            name="typebook"
                            defaultValue="type"
                            onChange={(e) => handlerSelectTypeBook(e)}
                          >
                            <MenuItem disabled value="type">
                              Type Book
                            </MenuItem>

                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="virtual"> Virtual</MenuItem>
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-filled-label-tb">
                            Type Book
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label-tb"
                            id="demo-simple-select-filled"
                            variant="filled"
                            fullWidth
                            value={input.typebooks}
                            name="typebook"
                            defaultValue="type"
                            onChange={(e) => handlerSelectTypeBook(e)}
                          >
                            <MenuItem disabled value="type">
                              Type Book
                            </MenuItem>

                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="virtual"> Virtual</MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {!input.state ? (
                        <Box>
                          <InputLabel id="demo-simple-select-label-state">
                            State
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-label-state"
                            variant="filled"
                            fullWidth
                            value={input.states}
                            label="State"
                            defaultValue="state"
                            onChange={(e) => handlerSelectState(e)}
                          >
                            <MenuItem disabled value="state">
                              State
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem
                              disabled={
                                input.typebook === "virtual" ? true : false
                              }
                              value="Used"
                            >
                              Used
                            </MenuItem>
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-state">
                            State
                          </InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-state"
                            id="demo-simple-select"
                            value={input.states}
                            label="languages"
                            defaultValue="state"
                            onChange={(e) => handlerSelectState(e)}
                          >
                            <MenuItem disabled value="state">
                              State
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem
                              disabled={
                                input.typebook === "virtual" ? true : false
                              }
                              value="Used"
                            >
                              Used
                            </MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      {!input.language ? (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-languages">
                            Languages
                          </InputLabel>
                          <Select
                            error
                            id="outlined-error-helper-text"
                            helperText={err.input}
                            labelId="demo-simple-select-label-languages"
                            variant="filled"
                            fullWidth
                            value={input.languages}
                            label="languages"
                            defaultValue="languages"
                            onChange={(e) => handlerSelectLanguage(e)}
                          >
                            <MenuItem disabled value="languages">
                              Languages
                            </MenuItem>
                            {languages.map((e) => (
                              <MenuItem
                                disabled={
                                  input.language.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          <InputLabel id="demo-simple-select-label-languages">
                            Languages
                          </InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-languages"
                            id="demo-simple-select"
                            value={input.languages}
                            label="languages"
                            defaultValue="languages"
                            onChange={(e) => handlerSelectLanguage(e)}
                          >
                            <MenuItem disabled value="languages">
                              Languages
                            </MenuItem>
                            {languages.map((e) => (
                              <MenuItem
                                disabled={
                                  input.language.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}
                    </Box>
                    {!input.categorie ? (
                      <Box>
                        <InputLabel id="demo-simple-select-label-cat">
                          Categories
                        </InputLabel>
                        <Select
                          error
                          id="demo-simple-select"
                          helperText={err.input}
                          labelId="demo-simple-select-label-cat"
                          variant="filled"
                          fullWidth
                          value={input.categories}
                          label="Categories"
                          defaultValue="choose"
                          onChange={(e) => handlerSelectCategorie(e)}
                        >
                          <MenuItem disabled value="choose">
                            Categories
                          </MenuItem>
                          {categories.map((e) => (
                            <MenuItem
                              disabled={
                                input.categorie.includes(e) === false
                                  ? false
                                  : true
                              }
                              value={e}
                            >
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    ) : (
                      <Box>
                        {" "}
                        <InputLabel id="demo-simple-select-label-cat">
                          Categories
                        </InputLabel>
                        <Select
                          variant="filled"
                          fullWidth
                          labelId="demo-simple-select-label-cat"
                          id="demo-simple-select"
                          value={input.categories}
                          label="Categories"
                          defaultValue="choose"
                          onChange={(e) => handlerSelectCategorie(e)}
                        >
                          <MenuItem disabled value="choose">
                            Categories
                          </MenuItem>
                          {categories.map((e) => (
                            <MenuItem
                              disabled={
                                input.categorie.includes(e) === false
                                  ? false
                                  : true
                              }
                              value={e}
                            >
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}

                    <Box>
                      {!input.gender.length ? (
                        <Box>
                          <InputLabel id="demo-simple-select-label-genders">
                            Genders
                          </InputLabel>

                          <Select
                            error
                            fullWidth
                            id="demo-simple-select"
                            helperText={err.input}
                            labelId="demo-simple-select-label-genders"
                            variant="filled"
                            defaultValue="choose"
                            onChange={(e) => handlerSelectGenders(e)}
                            value={input.genders}
                            label="Genders"
                          >
                            <MenuItem disabled value="choose">
                              Genders
                            </MenuItem>
                            {genders.map((e) => (
                              <MenuItem
                                disabled={
                                  input.gender.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      ) : (
                        <Box>
                          <InputLabel id="demo-simple-select-label-genders">
                            Genders
                          </InputLabel>

                          <Select
                            variant="filled"
                            fullWidth
                            labelId="demo-simple-select-label-genders"
                            id="demo-simple-select"
                            defaultValue="choose"
                            onChange={(e) => handlerSelectGenders(e)}
                            value={input.genders}
                            label="Genders"
                          >
                            <MenuItem disabled value="choose">
                              Genders
                            </MenuItem>
                            {genders.map((e) => (
                              <MenuItem
                                disabled={
                                  input.gender.includes(e) === false
                                    ? false
                                    : true
                                }
                                value={e}
                              >
                                {e}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}
                    </Box>
                    <br />
                    <br />
                    <Box>
                      <InputLabel>Choosen Genders</InputLabel>
                      <Box className="genders">
                        {input.gender.map((e) => (
                          <Box
                            className="choosenGenders"
                            onClick={() => handleDelete(e)}
                          >
                            {e}{" "}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <br />
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={
                        !input.title ||
                        err.title ||
                        err.author ||
                        err.editorial ||
                        err.year ||
                        err.price ||
                        !input.typebook ||
                        !input.state ||
                        !input.language ||
                        !input.categorie||!input.gender.length
                          ? true
                          : false
                      }
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Item>
          </Grid>
        </Grid>
      </Box>
      </Box>}
    
    </Box>
 
  );
}
