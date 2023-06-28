import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  getAllBooks,

  setPage
} from "../../redux/actions";
import Card from "../card/card";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import Paginated from "../paginado/Paginated";
import SideBar from "../sidebar/Sidebar";
import s from "./home.module.css";




import horyzontal_Henry from "../../assets/Henry-Horyzontal.png";
import vertical_Henry from "../../assets/Henry.png";


import { Button, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Alert } from "@mui/material";
import Footer from "../Footer/Footer";

export default function Home() {
  const dispatch = useDispatch();
    const token = useSelector((state) => state.sessionState);
  const stripeId = useSelector((state) => state.stripeState);
  if (token.length !== 0) {
    let currentToken = token;

    localStorage.setItem("session", "[]");
    let session = JSON.parse(localStorage.getItem("session"));
    session.push(currentToken);
    localStorage.setItem("session", JSON.stringify(session));

    localStorage.setItem("stripe", "[]");
    let stripe = JSON.parse(localStorage.getItem("stripe"));
    stripe.push(stripeId);
    localStorage.setItem("stripe", JSON.stringify(stripe));
  }

  const theme = useSelector((state) => state.darkMode);
 
  

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
 
  let loadBooks = useSelector((state) =>
    state.books.filter((e) => e.available === true)
  );
  if(localStorage.getItem("session")){
    let session = JSON.parse(localStorage.getItem("session"));
     loadBooks = loadBooks.filter(e=>e.sellerId!==session[0].id)
    
  }
  // let currentPageGlobal = useSelector((state) => state.currentPage);


  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [dispatch]);


  // Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  // let pages = Math.ceil(loadBooks.length / booksPerPage);
  
  const [menu, setMenu] = useState(true);
  const xlMediaQuery = useMediaQuery('(min-width:1536px)');
  const xsMediaQuery = useMediaQuery('(min-width:600px)');
  

  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
  };

  
  function handleMenu(){
    if(menu) {setMenu(false)}
    else{setMenu(true)}
  };


  


return (<div  
  style={{ "background-color": theme && "#212529", "color": theme && "white" }}>
<Header />

{menu? 
(<Button onClick={handleMenu}><FilterListOffOutlinedIcon/></Button>) 
: (<Button onClick={handleMenu}><FilterListOutlinedIcon/></Button>)}
{allBooks.length ? (
<div>
<Grid container spacing={2} sx={{mt:2}}>
  {menu? 
  (<>
  <Grid item xs={12} sm={7} md={5} lg={3.2} xl={2.6}>
    <SideBar /> 
  </Grid>
  <Grid item xs={12} sm={5} md={7} lg={8.8} xl={7}>
    <div>
      <Grid container spacing={0}>
        {currentBooks.length? 
        (
        currentBooks?.map((b) => {return (
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <div key={b._id} className={s.card}>
          <Card
          id={b._id}
          title={b.title}
          image={b.image}
          typebook={b.typebook}
          price={b.price}
          author={b.author}
          type={b.typebook}
          product={b}
          />
        </div>
        </Grid>
        )})
        ) :
        (<>
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Alert severity="info">There are no matches - Keep Searching!</Alert>
        </Grid>
        </>)
        }
      </Grid>
      <div  className={s.paginated} style={{ "background-color": theme && "#212529", "color": theme && "white" }}>
        <Paginated
        booksPerPage={booksPerPage}
        allBooks={loadBooks.length}
        paginate={paginate}
        actualPage={currentPage}
        />
      </div>
    </div>
  </Grid>
  <Grid item xs={12} sm={12} md={12} lg={12} xl={2.4}>
    <div className={s.ImageContainer}>
    <a href="https://www.soyhenry.com" target="blank">
      <img 
      alt="Henry-Banner" 
      src={xlMediaQuery ? (vertical_Henry) : (horyzontal_Henry)} 
      width={xlMediaQuery ? "200" : (xsMediaQuery ? "600" : "400")} 
      height={xlMediaQuery ? "1000" : "200"}
      />
    </a>
    </div>
  </Grid>
  </>) :
  
  (<>
  <Grid item xs={12} sm={9} md={9} lg={9} xl={10.2} >
    <div>
      <Grid container spacing={0} sx={{ml:1}}>
        {currentBooks.length?
        (
        currentBooks?.map((b) => {return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <div key={b._id} className={s.card}>
          <Card
          id={b._id}
          title={b.title}
          image={b.image}
          typebook={b.typebook}
          price={b.price}
          author={b.author}
          type={b.typebook}
          product={b}
          />
        </div>
        </Grid>
        )})
        ): 
        (<>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Alert severity="info">There are no matches - Keep Searching!</Alert>
        </Grid>
        </>)
        
        }
      </Grid>
      <div className={s.paginated}>
        <Paginated
        booksPerPage={booksPerPage}
        allBooks={loadBooks.length}
        paginate={paginate}
        actualPage={currentPage}
        />
      </div>
    </div>
  </Grid>
  <Grid item xs={12} sm={3} md={3} lg={3} xl={1.8}>
    <div className={s.ImageContainer}>
      <a href="https://www.soyhenry.com" target="blank">
        <img 
        alt="Henry-Banner" 
        src={xsMediaQuery ? (vertical_Henry) : (horyzontal_Henry)} 
        width={xsMediaQuery ? "200" : "400"} 
        height={xsMediaQuery ? "1000" : "200"}
        />
      </a>
    </div>
  </Grid>
  </>)
  }
  
</Grid>
    

</div>
) : (
<>
<Grid container spacing={0} sx={{ml:1}}>
  <Grid item xs={12} sm={8} md={8} lg={8} xl={9}>
    <Loader />
  </Grid>
  <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
    <div className={s.ImageContainer}>
      <a href="https://www.soyhenry.com" target="blank">
        <img 
        alt="Henry-Banner" 
        src={xsMediaQuery ? (vertical_Henry) : (horyzontal_Henry)} 
        width={xsMediaQuery ? "200" : "400"} 
        height={xsMediaQuery ? "1000" : "200"}
        />
      </a>
    </div>
  </Grid>
</Grid>
</>
)}
<Footer/>
</div>)
};
