import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBooks, getAllAuthor, getAllBooks, getAllEditorial, getAllSaga, getAllUsers, getCategories, getGenders, getLanguages } from "../../redux/actions";
import CreatePost from "../createProduct/CreateProduct";
import DashCard from "../dashCard/dashCard";
import DashUser from "../dashUser/dashUser";
import DashUserNew from "../dashUserNew/dashUserNew";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import Paginated from "../paginado/Paginated";
import SideBar from "../sidebar/Sidebar";
import s from "./dashboardAdmin.module.css";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

export default function DashAdmin() {
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
    setCurrentPage(1);
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const loadBooks = useSelector((state) => state.books);
  const allUsers = useSelector((state) => state.users);
 
  const allOrders = allUsers?.slice().filter(user => user.purchases.length).map(user => user.purchases).flat();
  const allreviews = allUsers?.slice().filter(user => user.reviews.length).map(user => user.reviews).flat();
  
  

  // Local States
  const [section, setSection] = useState('Products');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  

  const [createProduct, setCreateProduct] = useState(false);
  const [menu, setMenu] = useState(false); 
  // menu: Constante para desplegar el menú lateral hecho sin material (solo css)

  
  
  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  function getBooks(e){
    e.preventDefault();
    dispatch(filterBooks('Clear'));
    setCurrentPage(1);
  };
  
  function getUsers(e){
    e.preventDefault();
    dispatch(getAllUsers());
    setCurrentPage(1);
  };

  function handleSections(e){
    e.preventDefault();
    setSection(e.target.value);
    menuDisplay(e)
  };
  
  function handleCreateProduct(e){
    e.preventDefault();
    if(createProduct) {setCreateProduct(false);}
    else {setCreateProduct(true);}
  };
  
  function menuDisplay(e){
    e.preventDefault();
    if(menu) {setMenu(false);}
    else {setMenu(true);}
  }
  
  
  


  return (
    <React.Fragment>
      <Header noSearch={true}/>
      
     {/* <button onClick={(e) => menuDisplay(e)}>Menu</button>
      <div className={menu? (s.sideBar2) : (s.sideBar1)}>
        <button onClick={(e) => menuDisplay(e)}>Close</button>
        <button onClick={(e) => handleSections(e)} value='Products'>Products</button>
        <button onClick={(e) => handleSections(e)} value='Users'>Users</button>
        <button onClick={(e) => handleSections(e)} value='Orders'>Orders</button>
        <button onClick={(e) => handleSections(e)} value='Reviews'>Reviews</button>
      </div> */}
      

    <div className={s.page}>
      <nav className={s.nav_side}>
        <ul className={s.nav_container}>
        
          <li className={s.nav_items}>
						<MenuBookOutlinedIcon/>
            <button onClick={(e) => handleSections(e)} value='Products'>Products</button>
          </li>
          
          <li className={s.nav_items}>
						<PeopleAltOutlinedIcon/>
            <button onClick={(e) => handleSections(e)} value='Users'>Users</button>
          </li>
            
          <li className={s.nav_items}>
						<SellOutlinedIcon/>
           <button onClick={(e) => handleSections(e)} value='Orders'>Orders</button>
          </li>
            
          <li className={s.nav_items}>
						<RateReviewOutlinedIcon/>
            <button onClick={(e) => handleSections(e)} value='Reviews'>Reviews</button>
          </li>
              
        </ul>
      </nav>

      

      
      
      <div className={s.content}>
     
      {section === 'Products' && <>
      
      <SideBar vertical={false}/>
    
      {createProduct &&
      (<Dialog 
      open={createProduct} 
      onClose={handleCreateProduct}
      fullScreen
      >
        <Button onClick={e => handleCreateProduct(e)} variant="contained">Close Form</Button>
        <CreatePost/>
      </Dialog>) 
      }
      
      <div className={s.titles}>
        <h3>Books</h3>
        <Stack direction="row" spacing={2}>
          <Button onClick={e => getBooks(e)} variant="outlined" startIcon={<CachedOutlinedIcon />}>Refresh</Button>
          <Button onClick={e => handleCreateProduct(e)} variant="contained" endIcon={<AddCircleOutlineOutlinedIcon />}>New</Button>
        </Stack>
      </div>
      
      {allBooks.length ? (
        <div className={s.container}>
          <div className={s.paginated}>
            <Paginated
              booksPerPage={booksPerPage}
              allBooks={loadBooks.length}
              paginate={paginate}
              actualPage={currentPage}
            />
          </div>
          <div className={s.cards}>
            {currentBooks?.map((b) => {
              return (
              <div key={b._id}>
                <DashCard
                id={b._id}
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
                seller={b.seller}
                buyer={b.buyers}
                />
              </div>)
            })}
          </div>

        </div>) :
        (<>
          <p>Loading Products</p>
          <Loader />
      </>)}
      
      </>}
      
      
      {section === 'Users' && <>
      
      <div className={s.titles}>
        <h3>Users</h3>
        <Stack direction="row" spacing={2}>
          <Button onClick={e => getUsers(e)} variant="outlined" startIcon={<CachedOutlinedIcon />}>Refresh</Button>
          <DashUserNew/>
        </Stack>
      </div>
      
      {allUsers.length ? (
      <div className={s.container} >
        
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers?.map((u)=>{return(
                <DashUser user={u} key={u._id}/>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
    
      </div>) : 
      (<>
      <p>Loading Users</p>
      <Loader />
      </>)
      }
      
      </>}
      
      
      {section === 'Orders' && (<>
      <div className={s.titles}>
        <h3>Orders</h3>
        <Stack direction="row" spacing={2}>
          <Button onClick={e => getUsers(e)} variant="outlined" startIcon={<CachedOutlinedIcon />}>Refresh</Button>
        </Stack>
      </div>
      
      {allUsers.length ? (
      <div className={s.container}>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Seller</TableCell>
                <TableCell align="left">Buyer</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders?.map((ord)=>{
              if(ord.title.length > 30){ord.title = ord.title.slice(0,30) + '...'};
              let niceDate = ord.date = ord.date.split(':').slice(0,2);
              if(niceDate[1].length === 1) {niceDate[1] = '0' + niceDate[1]};
              ord.date = niceDate.join(':');
              return(
              <TableRow key={ord.productId}>
                <TableCell>{ord.productId}</TableCell>
                <TableCell align="left">{ord.title}</TableCell>
                <TableCell align="left">{ord.sellerName}</TableCell>
                <TableCell align="left">{ord.buyerName}</TableCell>
                <TableCell align="left">{ord.date}</TableCell>
                <TableCell align="left">{ord.amount}</TableCell>
              </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
    
      </div>) : 
      (<>
      <p>Loading Users</p>
      <Loader />
      </>)
      }
      
      </>)}
      
      
      {section === 'Reviews' && (<>
      <div className={s.titles}>
        <h3>Reviews</h3>
        <Stack direction="row" spacing={2}>
          <Button onClick={e => getUsers(e)} variant="outlined" startIcon={<CachedOutlinedIcon />}>Refresh</Button>
        </Stack>
      </div>
      
      {allUsers.length ? (
      <div className={s.container}>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell align="left">Seller</TableCell>
                <TableCell align="left">Buyer</TableCell>
                <TableCell align="left">Calification</TableCell>
                <TableCell align="left">Commentary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allreviews?.map((rev)=>{
              if(rev.comment.length > 30){rev.comment = rev.comment.slice(0,30) + '...'};
              return(
              <TableRow key={rev.productId}>
                <TableCell>{rev.productId}</TableCell>
                <TableCell align="left">{rev.sellerName}</TableCell>
                <TableCell align="left">{rev.buyerUsername}</TableCell>
                <TableCell align="left">{rev.score}</TableCell>
                <TableCell align="left">{rev.comment}</TableCell>
              </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
    
      </div>) : 
      (<>
      <p>Loading Users</p>
      <Loader />
      </>)
      }
      </>)}
      
      
      <br/>
      <hr/>
    
      </div>
      </div>
    </React.Fragment>
  );
};
