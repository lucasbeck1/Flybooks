import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/CreateProduct";
import Stripe from "./components/stripe/Stripe.jsx";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import Cart from "./components/cart/Cart.jsx"
import DashboardAdmin from "./components/dashboardAdmin/dashboardAdmin"
import { RecoverPassword } from "./components/recoverPassword/RecoverPassword";
import { ConfirmAcount } from "./components/confirmAcount/ConfirmAcount";
import Reviews from "./components/reviews/Reviews";
import Favorites from "./components/favorites/Favorites";
import MyProducts from "./components/myProducts/MyProducts";
import Profile from "./components/myProducts/Profile";
import DarkMode from "./components/DarkMode/DarkMode";
import { UserRoutes } from "./components/protectionRoute/UserRoutes";
import { AdminRoutes } from "./components/protectionRoute/AdminRoutes";
import About from "./components/AboutUs/About";
import "./App.css"



export default function App() {
  return (
    <div >
      <DarkMode/>
      <Router>
        <Routes>
          
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/recoverpassword" element={<RecoverPassword/>} />
          <Route exact path="/confirmacount" element={<ConfirmAcount/>} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createproduct" element={<UserRoutes><CreateProduct /></UserRoutes> } />
          <Route exact path="/detail/:_id" element={<Detail />} />
          <Route exact path="/payment/:_id" element={<UserRoutes><Stripe /></UserRoutes>} />
          <Route exact path="/cart" element={<UserRoutes><Cart /></UserRoutes>} />
          <Route exact path="/admin" element={<AdminRoutes><DashboardAdmin /></AdminRoutes>} />
          <Route exact path="/sellers" element={<UserRoutes><Reviews/></UserRoutes>} />
          <Route exact path="/favorites" element={<UserRoutes><Favorites/></UserRoutes>} />
          <Route exact path="/myproducts" element={<UserRoutes><MyProducts/></UserRoutes>} />
          <Route exact path="/profile" element={<UserRoutes><Profile/></UserRoutes>} />
          <Route exact path="/aboutUs"element={<About/>} />
        </Routes>
      </Router>
    </div>
  );
}
