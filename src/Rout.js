

import React from 'react';
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import All from "./pages/All";
import Bestsellers from "./pages/Bestsellers";
import Rings from "./pages/Rings";
import Earrings from "./pages/Earrings";
import Pendants from "./pages/Pendants";
import Chains from "./pages/Chains";
import Bangles from "./pages/Bangles";
import Product from "./ProductsPages/Product";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
const Rout = () => {
  return (
    <div>
      
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Shop' element={<All />}/>
      <Route path='/Bestsellers' element={<Bestsellers/>}/>
      <Route path='/Chains' element={<Chains/>}/>
      <Route path='/Rings' element={<Rings/>}/>
      <Route path='/Bangles' element={<Bangles/>}/>
      <Route path='/Pendants' element={<Pendants/>}/>
      <Route path='/Earrings' element={<Earrings/>}/>
      <Route path='/Product' element={<Product/>}/>
      <Route path='/Contactus' element={<ContactUs/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      </Routes>
   
    </div>
  )
}

export default Rout
