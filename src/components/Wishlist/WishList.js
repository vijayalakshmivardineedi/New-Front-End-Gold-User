import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WishList.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axios";

const WishList = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItem, setCartItem] = useState([]); // Example initial state is an empty array
 
  const userId = JSON.parse(localStorage.getItem("User")); // Get userId from localStorage
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState(''); // Define setMessage
  const [showPopup, setShowPopup] = useState(false); // Define setShowPopup

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get(`/getWishlistItems`);
      if (response && response.data && response.data.wishlistItems) {
        setWishlistItems(response.data.wishlistItems);
        console.log(response.data);
      } else {
        console.error("Wishlist items not found!");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist(); // Initial fetch when component mounts
  }, [_id]);


  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axiosInstance.post("/removeWishlistItems", { productId });
  
      if (response.status === 201) {
        setMessage(response.data.message);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
  
        // Fetch wishlist again to update the list
        fetchWishlist();
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred while removing from wishlist"
      );
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      console.error("Error:", error);
    }
  };
  

  const handleAddToCart = async (curElm) => {
    try {
      const requestBody = {
        user: userId._id,
        cartItem: [
          {
            product: curElm.product,
            quantity,
            name: curElm.name,
            description: curElm.description,
            selectedGoldType: curElm.selectedGoldType,
            selectedSize: curElm.selectedSize,
            selectedDiamondType: curElm.selectedDiamondType,
            selectedGoldKt: curElm.selectedGoldKt,
            originalPrice: curElm.originalPrice,
            sizePrice: curElm.sizePrice,
            diamondTypePrice: curElm.diamondTypePrice,
            goldKtPrice: curElm.goldKtPrice,
            finalTotal: curElm.finalTotal,
            image: curElm.image
          }
        ]
      };
      console.log(requestBody);
      const response = await axiosInstance.post("/addItemToCart", requestBody);
  
      if (response.status === 201) {
        setMessage(response.data.message);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/cart');
        }, 2000);
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="container-fluid">
      <div className="row ">
        <center>
        <h1 className="wishlist-heading"> Wishlist</h1></center>
        {wishlistItems.map((curElm) => (
          <div className="wishlist-box" key={curElm._id} >
            <img
              className="image"
              src={`http://localhost:2000${curElm.image}`}
              alt={curElm.name}
              style={{ width: "100%"}}
            />
            <div className="row" style={{marginLeft:"10px"}}>
              <h1 className="wishlist-header">{curElm.name}</h1>
            </div>
            <div className="row mt-3 p-2" style={{marginLeft:"10px"}}>
              <h1 className="wishlist-price"><b>₹{curElm.originalPrice}/-</b></h1>
            </div>
            <div className="buttons-wishlist">
              <button
                className="wishlist-remove-button"
                onClick={() => {
                  handleRemoveFromWishlist(curElm._id);
                }}
              >
                Remove
              </button>
              <button
                className="wishlist-cart "
               onClick={() => handleAddToCart(curElm)}

              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
        {showPopup && (
        <div className="popup">
          <div className="popup-content-big">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <p>{message}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default WishList;