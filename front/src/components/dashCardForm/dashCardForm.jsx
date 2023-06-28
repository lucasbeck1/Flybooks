import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAllBooks, modifyPost } from "../../redux/actions";

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';





export default function DashCardForm({ id, title ,author, editorial, language, year, state, typebook, price, categorie, gender, saga}){


  //Global States
  const allCategories = useSelector(state => state.categories);
  const allGenders = useSelector(state => state.genders);
  const allLanguages = useSelector(state => state.languages);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Local States
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
    saga: saga
  });
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  
  // if(open) console.log(input);
  // if(open) console.log('formError', error);

  const initialDataJson = JSON.stringify({
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
    saga: saga
  });
  const inputJson = JSON.stringify(input)

  

  // Functions
  function handleOpen(){
    setOpen(true);
  };
  
  function handleClose(){
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
      saga: saga
    });
    setError({});
    setOpen(false);
  };
  
  function validate(input){
    let actualYear = new Date().getFullYear();
    let RegEXP = /[`ª!@#$%^*_+=[\]{};"\\|,<>/~]/;
    let err = {};
    
    if (!input.title) {err.title = "· Title is required"} 
    else if (RegEXP.test(input.title)) {err.title = "· Special characters are not accepted"}
    else if(input.title.length > 100) {err.title = "· Title too long"}
    
    else if (!input.author) {err.author = "· Author is required"}
    else if (RegEXP.test(input.author)) {err.author = "· Special characters are not accepted"}
    else if(input.author.length > 100) {err.author = "· Author name too long"}
    else if (RegEXP.test(input.author)) {err.author = "· Special characters are not accepted"}
    
    else if (!input.editorial) {err.editorial = "· Editorial is required"}
    else if (RegEXP.test(input.editorial)) {err.editorial = "· Special characters are not accepted"}
    else if(input.editorial.length > 100) {err.editorial = "· Editorial name too long"}
    else if (RegEXP.test(input.editorial)) {err.editorial = "· Special characters are not accepted"}
    
    if (RegEXP.test(input.saga)) {err.saga = "· Special characters are not accepted"}
    
    else if (!input.gender.length) {err.gender = "· Select at least one gender"}
    
    else if (!input.year) {err.year = "· Year input is required"}
    else if (input.year < 0 || input.year > actualYear) {err.year = "· Year input Error"}
    
    else if (!input.price || input.price < 0) {err.price = "· Price input Error"}
    
    return (err);
  };
  
  function inputChange(e){
    e.preventDefault();
    setInput({
    ...input,
    [e.target.name]: e.target.value
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  };
  
  function selectCategorie(e){
    e.preventDefault();
    setInput({
      ...input,
      categorie: e.target.value
    });
  };
  
  function selectGendersMUI(e){
    let {target: { value }} = e;
    // On autofill we get a stringified value.
    setInput({
      ...input,
      gender: typeof value === 'string' ? value = value.split(',') : value,
    });
    setError(validate({
      ...input,
      gender: typeof value === 'string' ? value = value.split(',') : value,
    }));
  };
  
  function changeStateMUI(e){
    if(e.target.value === 'virtual'){
      setInput({
        ...input,
        [e.target.name]: e.target.value,
        state: 'New'
      })
    }else{
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }
  };
  
  async function modifyMUI(){
    const inputSend = input;
    // console.log('SEND', inputSend); 
    await dispatch(modifyPost(id, inputSend));
    dispatch(getAllBooks());
    handleClose();
    return MySwal.fire("Book Update succesfully", "" , "success");
  };





  return(
  <React.Fragment>
    <Button onClick={e => handleOpen(e)} variant="outlined" size="small">Update</Button>
  
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Edit Book</DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          Fill the fields you want to change
        </DialogContentText>
        
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name='title'
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={input.title}
          onChange={(e)=>inputChange(e)}
          error={error.title}
          helperText={error.title}
        />
        <TextField
          autoFocus
          margin="dense"
          id="saga"
          name='saga'
          label="Saga"
          type="text"
          fullWidth
          variant="outlined"
          value={input.saga}
          onChange={(e)=>inputChange(e)}
          error={error.saga}
          helperText={error.saga}
        />
        <TextField
          autoFocus
          margin="dense"
          id="author"
          name="author"
          label="Author"
          type="text"
          fullWidth
          variant="outlined"
          value={input.author}
          onChange={(e)=>inputChange(e)}
          error={error.author}
          helperText={error.author}
        />
        <TextField
          autoFocus
          margin="dense"
          id="editorial"
          name="editorial"
          label="Editorial"
          type="text"
          fullWidth
          variant="outlined"
          value={input.editorial}
          onChange={(e)=>inputChange(e)}
          error={error.editorial}
          helperText={error.editorial}
        />
        <TextField
          autoFocus
          margin="dense"
          id="year"
          name="year"
          label="Year"
          type="number"
          fullWidth
          variant="outlined"
          value={input.year}
          onChange={(e)=>inputChange(e)}
          error={error.year}
          helperText={error.year}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={input.price}
          onChange={(e)=>inputChange(e)}
          error={error.price}
          helperText={error.price}
        />
        
        <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
          <InputLabel id="select-label-1" variant='outlined'>Category</InputLabel>
          <Select
            labelId="select-label-1"
            id="select-1"
            label="Category"
            value={input.categorie}
            onChange={(e) => selectCategorie(e)}
          >
            {allCategories?.map(cat => {return(<MenuItem key={cat} value={cat}>{cat}</MenuItem>)})}
          </Select>
        </FormControl>
        
        <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
          <InputLabel id="checkbox-label-1">Genders</InputLabel>
          <Select
            labelId="checkbox-label-1"
            id="checkbox-1"
            label="Genders"
            input={<OutlinedInput label="Genders" />}
            multiple
            value={input.gender}
            onChange={selectGendersMUI}
            renderValue={(selected) => selected.join(', ')}
            error={error.gender}
          >
            {allGenders?.map(gen => {return(
            <MenuItem key={gen} value={gen}>
              <Checkbox checked={input.gender.indexOf(gen) > -1} />
              <ListItemText primary={gen} />
            </MenuItem>
            )})}
          </Select>
          <Typography>{error.gender}</Typography>
        </FormControl>
        
        <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
          <InputLabel id="select-label-2" variant='outlined'>Language</InputLabel>
          <Select
            labelId="select-label-2"
            id="select-2"
            label="Language"
            value={input.language}
            onChange={(e) => selectCategorie(e)}
          >
            {allLanguages?.map(cat => {return(<MenuItem key={cat} value={cat}>{cat}</MenuItem>)})}
          </Select>
        </FormControl>
        
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <FormLabel id="radio-group-label-1">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-group-label-1"
            name="typebook"
            onChange={e=>changeStateMUI(e)}
            value={input.typebook}
          >
            <FormControlLabel value="physical" control={<Radio />} label="Physical" />
            <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
          </RadioGroup>
        </FormControl>
        
        <FormControl sx={{ m: 1, minWidth: 80 }} >
          <FormLabel id="radio-group-label-2">State</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-group-label-2"
            name="state"
            onChange={e=>changeStateMUI(e)}
            value={input.state}
          >
            <FormControlLabel value="New" control={<Radio />} label="New" disabled={input.typebook === 'virtual'? (true) : (false)}/>
            <FormControlLabel value="Used" control={<Radio />} label="Used" disabled={input.typebook === 'virtual'? (true) : (false)}/>
          </RadioGroup>
        </FormControl>
      
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {initialDataJson === inputJson || Object.keys(error).length ? (<Button disabled onClick={modifyMUI}>Modify</Button>) : (<Button onClick={modifyMUI}>Modify</Button>)}
        </DialogActions>
      
      </DialogContent>
    </Dialog>
  </React.Fragment>
  )
};
