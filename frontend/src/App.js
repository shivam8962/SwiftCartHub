import './App.css';
import Header from "./component/layout/Header/Header.js" 
import React from 'react';
import { BrowserRouter as Router,  Route, Routes, Navigate} from "react-router-dom"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js'
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import { useState } from 'react';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrder.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderProduct from './component/Admin/OrderList.js';
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js"

function App() { 

  const{isAuthenticated, user} = useSelector(state=>state.user)

  const [stripeapiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  
  React.useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  return(
    <Router> 
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/product/:id" element={<ProductDetails/>}/>
      <Route exact path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route exact path="/search" element={<Search/>}/>
      <Route exact path="/login" element={<LoginSignUp/>}/>
      {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
      {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
      {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
      <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
      <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
      {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
      {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>}
      {isAuthenticated && stripeapiKey && <Route exact path="/process/payment" element={(<Elements stripe={loadStripe(stripeapiKey)}> <Payment/> </Elements>)}/>}
      <Route exact path="/cart" element={<Cart/>}/>
      {isAuthenticated && <Route exact path="/success" element={<OrderSuccess/>}/>}
      {isAuthenticated && <Route exact path="/orders" element={<MyOrders/>}/>}
      {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>}
      {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/products" element={<ProductList/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/product" element={<NewProduct/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/orders" element={<OrderProduct/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/>}
      {isAuthenticated && (user.role==="admin") && <Route exact path="/admin/users" element={<UsersList/>}/>}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
