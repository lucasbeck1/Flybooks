import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deletePost, disablePost, getAllBooks } from "../../redux/actions";
import DashCardForm from '../dashCardForm/dashCardForm';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import defaultImage from '../../assets/bookDefault.png';
import s from './dashCard.module.css';





export default function DashCard({id, title, image, typebook, price, author, categorie, editorial, saga, language, gender, year, state, available, seller, buyer}){

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  
  
  function handleOpen(){
    setOpen(true);
  }
  
  function handleClose(){
    setOpen(false);
  }
  
  async function disable(e){
    let stateAux = available ? ("disabled") : ("enabled");
    e.preventDefault();
    await dispatch(disablePost(id));
    dispatch(getAllBooks());
    return MySwal.fire(`The product has been ${stateAux}`, "", "info");
  }
  
  async function deletes(e){
    e.preventDefault();
    await dispatch(deletePost(id));
    dispatch(getAllBooks());
    handleClose();
    return MySwal.fire(`The product has been deleted`, "", "info");
  };



  // Only First Mayus
  let titlemod = title.toLowerCase().split(' ').join(' ');
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1,titlemod.length);
  title = titlemod;
  
  // Max title characters
  const maxLength1 = 60;
  let titleShort = title;
  if(title.length > maxLength1){
  titleShort = title.slice(0,maxLength1) + '...'
  };
  // Max saga characters
  let sagaShort = saga || '';
  if(saga && saga.length > maxLength1){
  sagaShort = saga.slice(0,maxLength1) + '...'
  };
  // Max author words
  const maxLength2 = 22;
  let authorShort = author;
  if(author.length > maxLength2){
    authorShort = author.split(' ').slice(0,2).join(' ');
  };
  // Sell string
  let sell = '';
  if(buyer.length) sell = '- SELLED';
  

  return(
  <React.Fragment>
    <div key={id} className={s.card}>
      <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
      <div className={s.info}>
        <p className={s.title}>{titleShort} {sell}</p>
        <p className={s.title}>Saga: {saga? sagaShort : 'Unique'}</p>
        <div>
          <p>Category: {categorie}</p>
          <span>Genders:</span>
          <span>{gender?.join(', ')}</span>
        </div>
        <div className={s.infoContainer}>
          <p>Author: {authorShort}</p>
          <p>|</p>
          <p>Editorial: {editorial}</p>
          <p>|</p>
          <p>Language: {language}</p>
          <p>|</p>
          <p>Year: {year}</p>
          <p>|</p>
          <p>State: {state}</p>
          <p>|</p>
          <p>Type: {typebook}</p>
          <p>|</p>
          <p>${price}</p>
          <p>|</p>
          {available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
        </div>
        <div className={s.controllerContainer}>
          <span>Seller: {seller}</span>
          <DashCardForm
          id={id}
          title={title}
          author={author}
          editorial={editorial}
          language={language}
          year={year}
          state={state}
          typebook={typebook}
          price={price}
          categorie={categorie}
          gender={gender}
          saga={saga}
          />
          {available? (<Button value={id} onClick={e => disable(e)} variant="outlined" size="small">Disable</Button>) : 
          (<Button value={id} onClick={e => disable(e)} variant="outlined" size="small">Enable</Button>)}
          <Button value={id} onClick={handleOpen} variant="outlined" size="small">Delete</Button>
        </div>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Delete User</DialogTitle>
    <DialogContentText sx={{p:9}}>
      Are you sure to delete {title} ?
    </DialogContentText>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={e=>deletes(e)}>Delete</Button>
    </DialogActions>
  </Dialog>
  </React.Fragment>
  )
};
