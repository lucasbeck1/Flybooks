import React from "react";
import defaultImage from "../../assets/loader4.gif"
import s from './loader.module.css';



const Loader=({loadImg})=>{
    
  return(
    <div className={s.loader}>
      <img src={loadImg? (loadImg) : (defaultImage)} alt="Load" className={s.loadIMG}/>
      <p>Please Wait ...</p>
    </div>
  )
};



export default Loader
