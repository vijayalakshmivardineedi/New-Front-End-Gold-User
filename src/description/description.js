import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsBasket3Fill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoDiamondSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "./description.css"
import "react-multi-carousel/lib/styles.css";
import Pincode from "../components/Pincode";
import Carousel from "react-multi-carousel"; // Import Carousel from the correct package
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import ReactImageMagnify from "react-image-magnify";
import { Link, useLocation, useNavigate, useHistory } from "react-router-dom";
import axiosInstance from "../helpers/axios";
import "./PopStyles.css";
import { AiFillGold } from 'react-icons/ai';

const Description = ({ addToCart, addToWishlist, addToOrder }) => {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate(); // Initialize size to 1
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const [isCustomized, setIsCustomized] = useState(false);
  const categoryId = product.category;
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGoldType, setSelectedGoldType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDiamondType, setSelectedDiamondType] = useState("");
  const [selectedGoldKt, setSelectedGoldKt] = useState("");
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [sizePrice, setsizePrice] = useState(0);
  const [diamondTypePrice, setdiamondTypePrice] = useState(0);
  const [goldKtPrice, setgoldKtPrice] = useState(0);
  const [finalTotal, setfinalTotal] = useState(0);


  console.log(selectedSize);
  console.log(selectedDiamondType);
  console.log(selectedGoldKt);
  console.log("sizePrice :" + sizePrice);
  console.log("diamondTypePrice :" + diamondTypePrice);
  console.log("GoldKtPrice:" + goldKtPrice);
  console.log("originalTotalPrice:" + originalTotalPrice);
  console.log("finalTotal:" + finalTotal);

  const toggleCustomization = () => {
    setIsCustomized(!isCustomized);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [location.pathname]);




  useEffect(() => {
    // Fetch product details and set the product state
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/getDetailsByProductId/${_id}`);
        if (response && response.data.product) {
          const productData = response.data.product;
          setProduct(productData);
          setOriginalTotalPrice(productData.total);
          setOriginalTotalPrice(productData.total);

          // Set the default selected size to the first size in the product.size array
          if (productData.size && productData.size.length > 0) {
            setSelectedSize(productData.size[0]);
          }

          // Set the default selected diamond type to the first type in the product.diamondType array
          if (productData.diamondType && productData.diamondType.length > 0) {
            setSelectedDiamondType(productData.diamondType[0]);
          }
          if (productData.goldType && productData.goldType.length > 0) {
            setSelectedGoldType(productData.goldType[0]);
          }

          // Set the default selected gold karat to the first karat in the product.goldKt array
          if (productData.goldKt && productData.goldKt.length > 0) {
            setSelectedGoldKt(productData.goldKt[0]);
          }
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    // Fetch similar products
    async function fetchSimilarProducts() {
      try {
        const response = await axiosInstance.get(`/getSimilarProducts/${categoryId}`);
        if (response && response.data.similarProducts) {
          setSimilarProducts(response.data.similarProducts);
        } else {
          console.error("Similar products not found!");
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    }

    fetchProduct();
    fetchSimilarProducts();
  }, [_id, categoryId]);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const userId = JSON.parse(localStorage.getItem("User"));
  // console.log(userId)
  // console.log(userId._id)

  const handleAddToCart = async () => {
    try {
      if (!userId) {
        navigate("/Login");
      } else {
        const requestBody = {
          user: userId._id,
          cartItem: [
            {
              quantity,
              product: product._id,
              name: product.name,
              description: product.description,
              selectedGoldType: selectedGoldType,
              selectedSize: selectedSize,
              selectedDiamondType:selectedDiamondType,
              selectedGoldKt:selectedGoldKt,
              originalPrice: originalTotalPrice,
              sizePrice:sizePrice,
              diamondTypePrice:diamondTypePrice,
              goldKtPrice:goldKtPrice,
              finalTotal:finalTotal,
              image: product.productPictures[selectedImage].img, // Use the correct image field 
            },
          ],
        };
        const response = await axiosInstance.post("/addItemToCart", requestBody);
        if (response.status === 201) {
          setMessage(response.data.message);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate("/Cart");
          }, 3000);
        }
      }
    } catch (error) {
      setMessage(error.response.data.message || error.response.data.error);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };


  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get(
      );
      if (response && response.data.wishlist) {
        setWishlist(response.data.wishlist);
      } else {
        console.error("Error fetching wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      if (!userId) {
        navigate("/Login");
      } else {
        const requestBody = {
          user: userId._id,
          wishlistItem: [
            {
              product: product._id,
              name: product.name,
              description: product.description,
              selectedGoldType: selectedGoldType,
              selectedSize: selectedSize,
              selectedDiamondType:selectedDiamondType,
              selectedGoldKt:selectedGoldKt,
              originalPrice: originalTotalPrice,
              sizePrice:sizePrice,
              diamondTypePrice:diamondTypePrice,
              goldKtPrice:goldKtPrice,
              finalTotal:finalTotal,
              image: product.productPictures[selectedImage].img,
            },
          ],
        };

        const response = await axiosInstance.post("/addItemToWishlist",
          requestBody,
        );
        if (response.status === 201) {
          setMessage(response.data.message);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate("/Wishlist");
          }, 3000);
        }
      }
    } catch (error) {
      setMessage(error.response.data.message || error.response.data.error);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };


  const convertToNumericValue = (formattedValue) => {
    // Removing commas from the formatted value
    const numericString = formattedValue.replace(/,/g, '');

    // Parsing the numeric string into a floating point number
    const numericValue = parseFloat(numericString);

    return numericValue;
  };

  const convertToIndianFormat = (value) => {
    if (value === "") return value;

    const number = parseFloat(value);
    if (isNaN(number)) return value;

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });

    return formatter.format(number).replace("₹", ""); // Removing the currency symbol
  };


  useEffect(() => {
    // Calculate final total whenever any of the relevant state variables change
    calculateFinalTotal(originalTotalPrice.toString(), sizePrice, diamondTypePrice, goldKtPrice);
  }, [originalTotalPrice, sizePrice, diamondTypePrice, goldKtPrice]);


  // Function to calculate final total
  const calculateFinalTotal = (originalTotalPrice, sizePrice, diamondTypePrice, goldKtPrice) => {
    console.log(originalTotalPrice, sizePrice, diamondTypePrice, goldKtPrice)
    let finalTotal = convertToNumericValue(originalTotalPrice);

    // Add sizePrice, diamondTypePrice, and goldKtPrice
    finalTotal += sizePrice + diamondTypePrice + goldKtPrice;

    // Convert finalTotal to Indian format
    finalTotal = convertToIndianFormat(finalTotal.toString());

    // Set finalTotal
    setfinalTotal(finalTotal);

    // Return finalTotal
    return finalTotal;
  };




  console.log("Final Total:", finalTotal);

  const handleSizeChange = (size, index) => {
    setSelectedSize(size);
    const Size = index;
    console.log("Size :" + Size)
    const sizePrice = index * 500; // Adjusted for starting from 0 and increasing by 2500
    setsizePrice(sizePrice)
  };
  const handleDiamondType = (type, index) => {
    setSelectedDiamondType(type);
    const DiamondType = index;
    console.log("DiamondType :" + DiamondType)
    const diamondTypePrice = index * 15000; // Adjusted for starting from 0 and increasing by 2500
    setdiamondTypePrice(diamondTypePrice)
  };
  const handleGoldKt = (karat, index) => {
    setSelectedGoldKt(karat);
    const GoldKt = index;
    console.log("GoldKt: " + GoldKt)
    const goldKtPrice = index * 5000; // Adjusted for starting from 0 and increasing by 2500
    setgoldKtPrice(goldKtPrice)
  };



  const handleGoBack = () => {
    console.log("back clicked")
    navigate(-1);
  };

  return (
    <div className="description">
      <div>
        <div className="details" key={product._id}>
          <div onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
            <IoArrowBack style={{ fontSize: "30px", cursor: "pointer" }} />
          </div>
          <div className="big-img">
            {product.productPictures && product.productPictures.length > 0 && (
              <ReactImageMagnify
                smallImage={{
                  alt: product.name,
                  isFluidWidth: true,
                  src: `http://localhost:2000${product.productPictures[selectedThumbnail].img}`,
                  width: 400,
                  height: 400,
                }}
                largeImage={{
                  src: `http://localhost:2000${product.productPictures[selectedThumbnail].img}`,
                  width: 800,
                  height: 800,
                }}
                enlargedImagePosition="over"
              />
            )}
          </div>
          <div>
            <button
              className="wishlist-icon fs-1"
              onClick={handleAddToWishlist}
            >
              <AiOutlineHeart />
            </button>
          </div>
          <div className="box1">
            <div className="row">
              <h2 className="header">{product.name}</h2>
            </div>
            <div className="product-description">
              {finalTotal !== 0 ? (
                <>
                  <p className="Pprice">₹ {finalTotal}/-</p>
                  <p style={{ marginTop: "-17px", fontSize: "13px", color: "#4d4d4d", fontFamily: "Muli,Arial,sans-serif" }}>MRP Incl. of all taxes</p>
                </>
              ) : (
                <>
                  <p className="Pprice">₹ {product.total}/-</p>
                  <p style={{ marginTop: "-17px", fontSize: "13px", color: "#4d4d4d", fontFamily: "Muli,Arial,sans-serif" }}>MRP Incl. of all taxes</p>
                </>
              )}
            </div>

            <div className="thumb">
              {product.productPictures &&
                product.productPictures.map((picture, idx) => (
                  <img
                    key={idx}
                    alt={product.name}
                    src={`http://localhost:2000${picture.img}`}
                    width={100}
                    height={100}
                    onClick={() => setSelectedThumbnail(idx)}
                    className={selectedThumbnail === idx ? "active" : ""}
                  />
                ))}
            </div>
            <div>
              <p className="product-discription1">{product.description}</p>
            </div>
            <div className="boxed-text">
              <Pincode />
              <p className="dotted-border">
                (Order before 4pm for same-day-delivery)
              </p>
            </div>
            <div style={{ borderBottom: "1px solid #888" }}>
              <div className="customize-header" onClick={toggleCustomization} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p >
                  {isCustomized ? 'Hide Customize' : 'Customize this product'}
                </p>
                {isCustomized ? <FaMinus /> : <FaPlus />}
              </div>

              {isCustomized && (<>
                <div className="row">

                  {/* GoldType */}
                  <div className="col-md-3 cutomize-goldtype">
                    <select id="goldType" name="goldType" className="form-control" value={product.goldType}>
                      {product.goldType && product.goldType.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* GoldKt */}
                  <div className="customize-gold">
                    <AiFillGold /> GOLD KARAT :
                    {product.goldKt && product.goldKt.map((karat, index) => (
                      <label key={index} className="radio-inline">
                        <input
                          type="radio"
                          name="goldKarat"
                          value={karat}
                          checked={selectedGoldKt === karat} // Check if the current karat is selected
                          onChange={() => handleGoldKt(karat, index)}
                        />
                        {karat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* DiamondType */}
                <div className="customize-diamond">
                  <IoDiamondSharp /> DIAMOND :
                  {product.diamondType && product.diamondType.map((type, index) => (
                    <label key={index} className="radio-inline">
                      <input
                        type="radio"
                        name="diamondKarat"
                        value={type}
                        checked={selectedDiamondType === type} // Check if the current type is selected 
                        onChange={() => handleDiamondType(type, index)}
                      />
                      {type}
                    </label>
                  ))}
                </div>

                {/* productSize */}
                <div>
                  {product.size && product.size.map((size, index) => (
                    <label key={index} className="radio-inline">
                      <input
                        type="radio"
                        name="productSize"
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => handleSizeChange(size, index)}
                      />
                      {size}
                    </label>
                  ))}
                </div>

              </>)}
            </div>

            <button className="cart fs-3 " onClick={handleAddToCart}>
              ADD TO CART
            </button>

            <p className="query">
              Any Questions? Please feel free to reach us at:
              <b>18001236547</b>
            </p>
          </div>
        </div>
        <h1>Similar Products</h1>
        <div className="similarproducts3">
          <Carousel showDots={true} responsive={responsive}>
            {similarProducts.map((item) => (
              <div className="Scard">
                <Link to={`/description/${item._id}`} key={item._id}>
                  <img
                    className="product--image"
                    src={`http://localhost:2000${item.productPictures[0].img}`}
                    alt={item.name}
                  />
                </Link>
                <h2>{item.name}</h2>
                <p className="Sprice">₹ {item.total}/-</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="product-details-container m-4">
          <table className="product-details-table fs-4" style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }} >
            <tbody>
              <tr>
                <th colSpan="2">PRODUCT DETAILS</th>
              </tr>
              {product.productCode && (
                <tr>
                  <td className="col-md-6">Product Code</td>
                  <td className="col-md-6">{product.productCode}</td>
                </tr>
              )}
              {product.height && (
                <tr>
                  <td className="col-md-6">Height</td>
                  <td className="col-md-6">{product.height}</td>
                </tr>
              )}
              {product.width && (
                <tr>
                  <td className="col-md-6">Width</td>
                  <td className="col-md-6">{product.width}</td>
                </tr>
              )}
              {product.totalProductWeight && (
                <tr>
                  <td className="col-md-6">Product Weight</td>
                  <td className="col-md-6">{product.totalProductWeight}</td>
                </tr>
              )}
              <tr>
                <th colSpan="2">DIAMOND DETAILS</th>
              </tr>
              {product.diamondWeight && (
                <tr>
                  <td className="col-md-6">Total Weight</td>
                  <td className="col-md-6">{product.diamondWeight}</td>
                </tr>
              )}
              {product.diamondCount && (
                <tr>
                  <td className="col-md-6">Total No. Of Diamonds</td>
                  <td className="col-md-6">{product.diamondCount}</td>
                </tr>
              )}
              {product.diamondClarity && (
                <tr>
                  <td className="col-md-3">Clarity</td>
                  <td className="col-md-3">{product.diamondClarity}</td>
                </tr>
              )}
              {product.diamondColour && (
                <tr>
                  <td className="col-md-3">Color</td>
                  <td className="col-md-6">{product.diamondColour}</td>
                </tr>
              )}
              {product.diamondShape && (
                <tr>
                  <td className="col-md-3">Shape</td>
                  <td className="col-md-6">{product.diamondShape}</td>
                </tr>
              )}
              {product.diamondSize && (
                <tr>
                  <td className="col-md-3">Shape</td>
                  <td className="col-md-6">{product.diamondSize}</td>
                </tr>
              )}
              {product.diamondSettingType && (
                <tr>
                  <td className="col-md-3">Setting Type</td>
                  <td className="col-md-6">{product.diamondSettingType}</td>
                </tr>
              )}

              {product.stone && (
                <tr>
                  <th colSpan="2">{product.stone} DETAILS</th>
                </tr>
              )}
              {product.stoneColour && (
                <tr>
                  <td className="col-md-6">Color</td>
                  <td className="col-md-6">{product.stoneColour}</td>
                </tr>
              )}
              {product.stonesCount && (
                <tr>
                  <td className="col-md-6">Count</td>
                  <td className="col-md-6">{product.stonesCount}</td>
                </tr>
              )}
              {product.stoneShape && (
                <tr>
                  <td className="col-md-6">Shape</td>
                  <td className="col-md-6">{product.stoneShape}</td>
                </tr>
              )}
              {product.stoneSize && (
                <tr>
                  <td className="col-md-6">Size</td>
                  <td className="col-md-6">{product.stoneSize}</td>
                </tr>
              )}
              {product.stoneWeight && (
                <tr>
                  <td className="col-md-6">Weight</td>
                  <td className="col-md-6">{product.stoneWeight}</td>
                </tr>
              )}
              {product.stoneSettingtype && (
                <tr>
                  <td className="col-md-6">Setting Type</td>
                  <td className="col-md-6">{product.stoneSettingtype}</td>
                </tr>
              )}

              <tr>
                <th colSpan="2">METAL DETAILS</th>
              </tr>
              {product.goldType && (
                <tr>
                  <td className="col-md-6">Type</td>
                  <td className="col-md-6">
                    {product.goldType}
                  </td>
                </tr>
              )}
              {product.goldKt && (
                <tr>
                  <td className="col-md-6">Kt</td>
                  <td className="col-md-6">
                    {product.goldKt}
                  </td>
                </tr>
              )}
              {product.goldWeight && (
                <tr>
                  <td className="col-md-6">Weight</td>
                  <td className="col-md-6">
                    {product.goldWeight}
                  </td>
                </tr>
              )}
              {product.metalWeight && (
                <tr>
                  <td className="col-md-6">Weight</td>
                  <td className="col-md-6">{product.metalWeight}</td>
                </tr>
              )}
              <tr>
                <th colSpan="2">Custamized details</th>
              </tr>
              {<tr>
                <td className="col-md-6">Selected Size</td>
                <td className="col-md-6">{selectedSize}</td>
              </tr>}
              {<tr>
                <td className="col-md-6">Size Price</td>
                <td className="col-md-6">₹ {sizePrice}/-</td>
              </tr>}
              {<tr>
                <td className="col-md-6">Selected DiamondType</td>
                <td className="col-md-6"> {selectedDiamondType}</td>
              </tr>}
              {<tr>
                <td className="col-md-6">DiamondType Price</td>
                <td className="col-md-6">₹ {diamondTypePrice}/-</td>
              </tr>}
              {<tr>
                <td className="col-md-6">selected GoldKt</td>
                <td className="col-md-6">{selectedGoldKt}</td>
              </tr>}
              {<tr>
                <td className="col-md-6">GoldKt Price</td>
                <td className="col-md-6">₹ {goldKtPrice}/-</td>
              </tr>}
              {<tr>
                <td className="col-md-6">Final Price</td>
                <td className="col-md-6">₹ {finalTotal}/-</td>
              </tr>}

              <tr>
                <th colSpan="2">PRICE BREAKUP</th>
              </tr>
              {product.goldprice && (
                <tr>
                  <td className="col-md-6">Gold </td>
                  <td className="col-md-6">₹ {product.goldprice}/-</td>
                </tr>
              )}
              {product.diamondprice && (
                <tr>
                  <td className="col-md-6">Diamond</td>
                  <td className="col-md-6">₹ {product.diamondprice}/-</td>
                </tr>
              )}
              {product.stoneprice && product.stone && (
                <tr>
                  <td className="col-md-6"> {product.stone
                    ? product.stone
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                    : ''}</td>
                  <td className="col-md-6">₹ {product.stoneprice}/-</td>
                </tr>
              )}
              {product.makingCharges && (
                <tr>
                  <td className="col-md-6">Making Charges</td>
                  <td className="col-md-6">₹ {product.makingCharges}/-</td>
                </tr>
              )}
              {product.gst && (
                <tr>
                  <td className="col-md-6">GST</td>
                  <td className="col-md-6">₹ {product.gst}/-</td>
                </tr>
              )}
              {product.total && (
                <tr>
                  <td className="col-md-6">Total</td>
                  <td className="col-md-6">₹ {product.total}/-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content-big">
              <span className="close" onClick={() => setShowPopup(false)}>
                &times;
              </span>
              <p>{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;