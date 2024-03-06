import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Cart = ({ cart, removeFromCart }) => {

  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);
  
  useEffect(() => {
    
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:2000/api/cart/getCartItems`);
        
        console.log(response);
        if (response) {
          console.log(response);
          setCartItem(response.data.cartItems|| {}); // Ensure product is an object
        } else {
          console.error('Product not found!');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setIsLoading(false);
      }
    }

    
    fetchProduct();
  }, [_id]);


  return (
    <div>
      <h2>Cart</h2>
      <div className="container">
        {cart.map((curElm) => (
          <div className="box" key={curElm._id}>
            <div className="img_box ">
              <img src={curElm.Img} alt={curElm.name}/>
              </div>
            <div className="row">
              <h4 className="header">{curElm.name}</h4>
              <h5>{curElm.category}</h5>
            </div>
            <div>
              <p className="price">{curElm.price}</p>
            </div>
            <button onClick={() => removeFromCart(curElm)}>Remove</button>

            </div>
        ))}
      </div>
    </div>
  );


};

export default Cart;
