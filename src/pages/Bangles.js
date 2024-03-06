import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "../pages/All.css";
import axios from "axios";
import axiosInstance from "../helpers/axios";
const Bangles = ({ addToWishlist }) => {
  const { _id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  const category = "65cb2c7d58c8f815efc18535";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get(`/getProductByCategory/${category}`);  
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
          console.error("Selected product not found.");
          return; // Exit the function early
        }

        const requestBody = {
          user: userId._id,
          wishlistItem: [
            {
              product: selectedProduct._id,
              name: selectedProduct.name,
              description: selectedProduct.description,
              total: selectedProduct.total,
              image: selectedProduct.productPictures[selectedImage].img,
            },
          ],
        };

        const token = localStorage.getItem("token");
        const config = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any other headers you require
          },
        };

        const response = await axios.post(
          "http://localhost:2000/api/user/wishlist/addtowishlist",
          requestBody,
          config
        );

        if (response && response.data) {
          // Check if the response contains data
          if (response.data.wishlist) {
            setWishlist(response.data.wishlist);
            navigate("/Wishlist");
          } else {
            console.error(
              "Error adding item to wishlist: Wishlist data not found in response"
            );
          }
        } else {
          console.error(
            "Error adding item to wishlist: Response data not found"
          );
        }
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
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

  const renderProductRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
      const rowProducts = products.slice(i, i + 4);
      rows.push(
        <div className="row" key={i}>
          {rowProducts.map((curElm) => (
            <div className="col-md-3" key={curElm._id}>
              {/* Render each product item here */}
              
                <div className="box">
                <Link to={`/description/${curElm._id}`}>
                  <div className="img_box">
                    {/* Product image */}
                    {curElm.productPictures.map((productPictures, index) => (
                      <img
                        key={index}
                        src={`http://localhost:2000${productPictures.img}`} // Adjust the URL as needed
                        alt={curElm.name}
                      />
                    ))}
                    </div>
                    </Link>
                    {/* Icons */}
                    <div className="icon">
                      <Link to={`/description/${curElm._id}`}>
                      <li>
                        <BsEye />
                      </li></Link>
                      <li>
                          <AiOutlineHeart onClick={() => handleAddToWishlist(curElm._id)}/>
                      </li>
                    </div>
                  <div className="detail">
                    <h1 >{curElm.name}</h1>
                    <h4 style={{fontSize:"18px", fontFamily:"Playfair Display", marginLeft:"10px"}}>
                      <BsCurrencyRupee />
                      <b>{curElm.total}/-</b>
                    </h4>
                  </div>
                </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };
  return (
    <div>
      <div className="Banner">
        <img
          style={{ height:  "auto" }}
          src="https://static.malabargoldanddiamonds.com/media/catalog/category/gold-bangle.jpg"
          className="d-block w-100"
          alt="Rings"
        />
      </div>
      <div className="sort-container">
        <div>
          <h1>Bangles</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Bangles
              </li>
            </ol>
          </nav>
        </div>
        <div className="sortby ">
          <label className="sort">Filter by: </label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="sortinput fs-3"
            style={{ width: "120px", height: "40px" }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
          </select>
        </div>
      </div>
      {/* Your existing JSX code for the product listing page */}
      <div className="product">
        <div className="container">{renderProductRows()}</div>
      </div>
    </div>
  );
};

export default Bangles;
