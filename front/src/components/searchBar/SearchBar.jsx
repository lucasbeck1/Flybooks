import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getBooksByName, searchBooks } from "../../redux/actions";
import s from './SearchBar.module.css';


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [reset, setReset] = useState("");
  const [search, setSearch] = useState();



  function handlerSumbit(e) {
    e.preventDefault();
    dispatch(getBooksByName(name));
    setReset("")
    setName("");
  }

  // console.log(name);
  const search_books = (e) => {
    let search = e.target.value;
    dispatch(searchBooks(search))
    setSearch(search);
  }


  return (
    <div className={s.container}>
      <input
        className={s.searchBarInput}
        type="text"
        onChange={(e) => search_books(e)}
        placeholder="Search..."
   
      />

      <AiOutlineSearch className={s.iconSearch} onClick={(e) => handlerSumbit(e)}/>
    </div>

  );
}
