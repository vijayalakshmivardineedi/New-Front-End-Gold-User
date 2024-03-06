//App.js
import React,{ useState, useEffect} from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Earrings from "./pages/Earrings";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import Home from "./components/HomePage/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Bangles from "./pages/Bangles"
import Pendants from "./pages/Pendants";
import Chains from "./pages/Chains";
import AboutPage from "./Policypages/AboutPage";
import WishList from "./components/Wishlist/WishList";
import Rings from "./pages/Rings";
import Cart from "./components/Cart/Cart";
import ShippingPolicy from "./Policypages/ShippingPolicy";
import Disclaimer from "./Policypages/Disclaimer";
import PrivacyPolicy from "./Policypages/PrivacyPolicy";
import ReturnPolicy from "./Policypages/ReturnPolicy";
import TermsCon from "./Policypages/TermsCon";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Profile from "./UserPanel/Profile";
import OrderSuccess from "./pages/OrderPlaced"; 
import ProtectRoute from './components/HOC/ProtectRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import Description from "./description/description";
import MyOrders from "./UserPanel/MyOrders";
const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    
    
  },[]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };
  const [order, setOrder] = useState([]);
  const addToOrder = (product) => {
    setOrder([...order, product]);
  };

  const removeFromOrder = (product) => {
    const updatedOrder = order.filter((item) => item.id !== product.id);
    setOrder(updatedOrder);
  };
  const [wishlist, setwishlist] = useState([]);

  const addToWishlist = (product) => {
    setwishlist([...wishlist, product]);
  };

  const removeFromwishlist = (product) => {
    const updatedwishlist = wishlist.filter((item) => item.id !== product.id);
    setwishlist(updatedwishlist);
  };
  return (
    <>
    <BrowserRouter>
  
    <Header/>
    <Routes>

    
    
    <Route path="/" element={<Home addToWishlist={addToWishlist} />} />
          <Route
            path="/Chains"
            element={<Chains addToWishlist={addToWishlist} />}
          />
          <Route
            path="/Rings"
            element={<Rings addToWishlist={addToWishlist} />}
          />
          <Route
            path="/WishList"
            element={
              <WishList
                wishlist={wishlist}
                removeFromwishlist={removeFromwishlist}
                addToCart={addToCart}
              />
            }
          />
        
          <Route
            path="/Cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                addToWishlist={addToWishlist}
                addToOrder={addToOrder}
              />
            }
          />
         
          <Route element={<ProtectRoute/>}/>
          <Route
            path="/Bangles"
            element={<Bangles addToWishlist={addToWishlist} />}
          />
          <Route
            path="/Pendants"
            element={<Pendants addToWishlist={addToWishlist} />}
          />
          <Route
            path="/Earrings"
            element={<Earrings addToWishlist={addToWishlist} />}
          />
         
          <Route path="/AboutUs" element={<AboutPage />} />
          <Route path="/Disclaimer" element={<Disclaimer />} />
          <Route path="/TermsCondition" element={<TermsCon />} />
          <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
          <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Myorders" element={<MyOrders />} />
          
          
        
 
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/Buy"
            element={
              <Checkout order={order} removeFromOrder={removeFromOrder} />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Signup" element={<Signup />} />
          
          <Route path="/Profile" element={<Profile />} />
          <Route path="/OrderPlaced" element={<OrderSuccess/>} />
          <Route path="/description/:_id" element={<Description />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;