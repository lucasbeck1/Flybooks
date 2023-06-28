import React from 'react'
import { Navigate } from 'react-router-dom';

export const UserRoutes = ({children}) => {

  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  if(!sesionLocal){
    return (
      <Navigate to={"/"}/>
    )
  }
  return children
  
}
