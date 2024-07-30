import "./App.css";
// import logo from './Assets/Logo.svg';

import {BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./Components/Home";
 import About from "./Components/About";
 import Work from "./Components/Work";
 import Testimonial from "./Components/Testimonial";
 import Contact from "./Components/Contact";
//  import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import Cart from "./Components/cart/cart";
import Checkout from "./Components/checkout/checkout";
import  Profile  from "./Components/profile/profile";
import ProductPage from "./Components/product/product";
import ProductDetails from "./Components/product/productdetails";
import Login from "./Components/profile/login";
import Register from "./Components/profile/register";

function App() {
  return (
    <>
      <div className="App">
      
     
      
      
    <BrowserRouter>  
    <Routes>
  <Route path="/Home"element={<Home />}></Route>
  <Route path="/About"element={<About/>}></Route>
  <Route path="/Work"element={<Work />}></Route>
  <Route path="/Testimonial"element={<Testimonial />}></Route>
  <Route path="/Contact"element={<Contact />}></Route>
  <Route path="/register"element={<Register/>}></Route>
  <Route path="/login"element={<Login />}></Route>
  
  <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/product" element={<ProductPage/>}/>
                <Route path="/productdetails/:id" element={<ProductDetails/>}/>
  
  </Routes>
  </BrowserRouter>  
  </div>
   </>
       
      
   
  );
}

export default App;