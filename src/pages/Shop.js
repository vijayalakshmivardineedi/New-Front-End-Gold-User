import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsEye } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import axios from "axios";
const Shop = ({ addToWishlist }) => {
  const { _id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [wishlist, setWishlist] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:2000/api/products");
        console.log(response.data.products) // Adjust the API endpoint as needed
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToWishlist = async (productId) => {
    try {
      if (!userId) {
        // User is not logged in, navigate to the login page
        navigate("/Login"); // Replace "/login" with the actual login page route
      } else {
      // Find the product by ID
      const selectedProduct = products.find((p) => p._id === productId);
  
      // Check if the selected product exists
      if (!selectedProduct) {
        console.error('Selected product not found.');
        return; // Exit the function early
      }
  
      const requestBody = {
        user: userId._id,
        wishlistItem: [{
          product: selectedProduct._id,
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          image: selectedProduct.productPictures[selectedImage].img,
        }],
      };
  
      const token = localStorage.getItem('token');
      const config = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers you require
        },
      };
  
      const response = await axios.post("http://localhost:2000/api/user/wishlist/addtowishlist", requestBody, config);
  
      if (response && response.data) {
        // Check if the response contains data
        if (response.data.wishlist) {
          setWishlist(response.data.wishlist);
          navigate("/Wishlist")
        } else {
          console.error('Error adding item to wishlist: Wishlist data not found in response');
        }
      } else {
        console.error('Error adding item to wishlist: Response data not found');
      }
    }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };


  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);

    // Sort the products based on the selected option
    const sortedProducts = [...products];

    if (selectedOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOption === "name-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(sortedProducts);
  };

  return (
    <div>
      <div className="Banner">
        <img
          style={{ height: 405 }}
          src="https://kinclimg3.bluestone.com/f_webp,c_scale,w_2380,b_rgb:ffffff/product/dynamic_banner/desktop/home/1562835330481-Ani_HPB_1190x386_July2019.jpg"
          className="d-block w-100 "
          alt="Rings"
        />
      </div>
      <div className='sortby'>
      <label className='sort' style={{fontSize:"25px"}}>Filter by:</label>
     <select value={sortBy} onChange={handleSortChange} className='sortinput fs-3' style={{width:"100px" , height:"40px", marginLeft:"-25px"}}>
            <option value="default" style={{color:"#262927"}}>Default</option>
            <option value="price-asc" style={{color:"#262927"}}>Price (Low to High)</option>
            <option value="price-desc" style={{color:"#262927"}}>Price (High to Low)</option>
            <option value="name-asc" style={{color:"#262927"}}>Name (A to Z)</option>
            <option value="name-desc" style={{color:"#262927"}}>Name (Z to A)</option>
          </select>
     </div>
      <div className="product">
        <div className="container">
          {products.map((curElm) => {
            return (
             
                <div className="box">
                   <Link to={`/Shop/${curElm._id}`} key={curElm._id}>
                  <div className="img_box ">
                    {curElm.productPictures.map((productPicture, index) => (
                      <img
                        key={index}
                        src={`http://localhost:2000${productPicture.img}`}
                        alt={curElm.name}
                      />
                    ))}
                    </div>
                </Link>
                    <div className="icon">
                    <Link to={`/Shop/${curElm._id}`} key={curElm._id}>
                      <li>
                        <BsEye />
                      </li>
                      </Link>
                      <li>
                        <AiOutlineHeart onClick={() => handleAddToWishlist(curElm._id)}/>
                      
                    </li>
                    </div>
                  <div className="detail">
                    <h1 style={{fontSize:"18px", marginLeft:"10px", fontWeight:"550px", color:"#4f3267"}}>{curElm.name}</h1>
                    <h4 style={{fontSize:"18px", marginLeft:"10px"}}>
                      <BsCurrencyRupee/>
                      <b>{curElm.price}/-</b>
                      </h4>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
      <div className="Banner">
        <img
          style={{ height: 405 }}
          src="https://kinclimg2.bluestone.com/f_webp,c_scale,w_2380,b_rgb:ffffff/product/dynamic_banner/desktop/home/1533120094643-NeoVintage_HPB_Without-pricing-line.jpg"
          className="d-block w-100"
          alt="Rings"
        />
      </div>
    </div>
  )
}

export default Shop