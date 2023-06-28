import React from 'react'
import { Navigate } from 'react-router-dom';

export const AdminRoutes = ({children}) => {
  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  
  if(!sesionLocal || (sesionLocal && sesionLocal[0].role === "user" )){
    return (
      <Navigate to={"/"}/>
    )
  }
  return children
  
}
