import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { IoGiftSharp } from "react-icons/io5";
import axiosInstance from "../../helpers/axios";
import { Modal, Button } from "react-bootstrap";
import ConfirmationDialog from "../../confirmation/Confirmation";

const Cart = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [wishlistItem, setWishlistItem] = useState([]);
  const [customizedDetails, setCustomizedDetails] = useState({});
  const [show, setShow] = useState(false);
  const userId = JSON.parse(localStorage.getItem("User"));
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [message, setMessage] = useState(''); // Define setMessage
  const [showPopup, setShowPopup] = useState(false); // Define setShowPopup
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const [quantities, setQuantities] = useState({});
  console.log(quantities)

  const [sizePrice, setsizePrice] = useState({});
  const [diamondTypePrice, setdiamondTypePrice] = useState({});
  const [goldKtPrice, setgoldKtPrice] = useState({});
  const [originalTotalPrice, setOriginalTotalPrice] = useState({});
  const [myfinalTotal, setfinalTotal] = useState({});

  console.log("sizePrice :", sizePrice);
  console.log("diamondTypePrice :", diamondTypePrice);
  console.log("GoldKtPrice:", goldKtPrice);
  console.log("Original Total Price Updated:", originalTotalPrice);
  console.log("myfinalTotal:", myfinalTotal);

  const [myselectedGoldType, setSelectedGoldType] = useState(0);
  const [myselectedSize, setSelectedSize] = useState(0);
  const [myselectedDiamondType, setSelectedDiamondType] = useState(0);
  const [myselectedGoldKt, setSelectedGoldKt] = useState(0);
  // const [myselectedGoldType, setSelectedGoldtype] = useState(null);

  

  // console.log("myselectedGoldKt:", myselectedGoldKt)
  // console.log("mySelectedDiamondType:", myselectedDiamondType)
  // console.log("myselectedSize:", myselectedSize)
  
  



  useEffect(() => {
    fetchProduct(); // Initial fetch when component mounts
  }, [_id]);
  useEffect(() => {
    console.log("Original Total Price Updated:", originalTotalPrice);
  }, [originalTotalPrice, quantities]);
  useEffect(() => {
    console.log("Final Total Updated:", myfinalTotal);
  }, [myfinalTotal]);



  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/getCartItems`);
      if (response && response.data.cartItems) {
        const cartItems = response.data.cartItems;
        setCartItem(cartItems);

        cartItems.forEach(async (item) => {
          try {
            const customizationResponse = await axiosInstance.get(`/getCustamizedByProductId/${item.product}`);
            if (customizationResponse && customizationResponse.data) {
              setCustomizedDetails((prevState) => ({
                ...prevState,
                [item.product]: customizationResponse.data,
              }));

              // setQuantities((prevQuantities) => ({
              //   ...prevQuantities,
              //   [item._id]: item.quantity || 0, // Use item._id as the key
              // }));

              // // Set selectedGoldKt, selectedDiamondType, selectedGoldType, and selectedSize for each item
              // setSelectedGoldKt((prevSelectedGoldKt) => ({
              //   ...prevSelectedGoldKt,
              //   [item._id]: item.selectedGoldKt || "", // Use item._id as the key
              // }));

              // setSelectedDiamondType((prevSelectedDiamondType) => ({
              //   ...prevSelectedDiamondType,
              //   [item._id]: item.selectedDiamondType || "", // Use item._id as the key
              // }));

              // setSelectedGoldType((prevSelectedGoldType) => ({
              //   ...prevSelectedGoldType,
              //   [item._id]: item.selectedGoldType || "", // Use item._id as the key
              // }));

              // setSelectedSize((prevSelectedSize) => ({
              //   ...prevSelectedSize,
              //   [item._id]: item.selectedSize || "", // Use item._id as the key
              // }));

              setOriginalTotalPrice((prevSetOriginalTotalPrice) => {
                const updatedState = {
                  ...prevSetOriginalTotalPrice,
                  [item._id]: item.originalPrice || "", // Use item._id as the key
                };
                console.log("Original Total Price Updated:", updatedState);
                // Logging the contents of originalTotalPrice as a string
                console.log("originalTotalPrice:", JSON.stringify(updatedState));
                // Iterating over keys and logging each entry
                Object.keys(updatedState).forEach(itemId => {
                  console.log(`Item ID: ${itemId}, Original Price: ${updatedState[itemId]}`);
                });
                return updatedState;
              });

              // Log the updated state
              console.log("Original Total Price Updated:", originalTotalPrice);

            }
          } catch (error) {
            console.error("Error fetching customized details:", error);
          }
        });
      } else {
        console.error("Product not found!");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsLoading(false);
    }
  };

  const handleApplyVoucher = () => {
    console.log("Applying voucher code:", voucherCode);
    setShowVoucherInput(false);
  };

  const handleUpdate = async (productId, action, myselectedSize, sizePrice, diamondTypePrice, goldKtPrice, originalTotalPrice, myfinalTotal) => {
    try {
        // Retrieve the necessary data for updating the cart item
        const updatedCartItem = cartItem.find(item => item._id === productId);
        const { _id: cartItemId, quantity, selectedGoldType, selectedDiamondType, selectedGoldKt, originalPrice } = updatedCartItem;

        // Extracting the selected size key
        const selectedSizeKey = Object.keys(myselectedSize).find(key => key === cartItemId);

        if (!selectedSizeKey) {
            console.error('Selected size key not found for the product:', productId);
            return;
        }

        const selectedSizeValue = myselectedSize[selectedSizeKey];

        const response = await axiosInstance.put("/updateCartItem", {
            cartItemId,
            quantity: action === 'increase' ? quantity + 1 : Math.max(quantity - 1, 1),
            selectedGoldType,
            selectedSize: selectedSizeValue,
            selectedDiamondType,
            selectedGoldKt,
            sizePrice,
            diamondTypePrice,
            goldKtPrice,
            myfinalTotal,
            originalPrice: originalTotalPrice ?? 0, // Assuming originalPrice comes from originalTotalPrice
        });

        console.log("Update Cart Item Response Status:", response?.status); // Log the response status
        if (response?.status === 200) {
            setMessage(response.data?.message ?? 'Cart item updated successfully');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 1000);
            fetchProduct();
        } else {
            console.error("Unexpected response status:", response?.status);
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message ?? error?.response?.data?.error ?? 'An error occurred while updating the cart item';
        setMessage(errorMessage);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 5000);
        console.error('Error:', error);
    } finally {
        setConfirmDelete(false);
    }
};


  


  // const handleIncreaseQuantity = async (productId) => {
  //   try {
  //     const updatedCartItem = cartItem.map((item) => {
  //       if (item._id === productId) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + 1,
  //         };
  //       }
  //       return item;
  //     });

  //     const response = await axiosInstance.post("/increaseCartItemQuantity", { productId });
  //     console.log("Increase Quantity Response Status:", response.status); // Log the response status
  //     if (response.status === 201) {
  //       setMessage(response.data.message);
  //       setShowPopup(true);
  //       setTimeout(() => {
  //         setShowPopup(false);
  //       }, 1000);
  //       fetchProduct();
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 1000);
  //     console.error('Error:', error);
  //   } finally {
  //     setConfirmDelete(false);
  //   }
  // };


  // const handleDecreaseQuantity = async (productId) => {
  //   try {
  //     const updatedCartItem = cartItem.map((item) => {
  //       if (item._id === productId && item.quantity > 1) {
  //         return {
  //           ...item,
  //           quantity: item.quantity - 1,
  //         };
  //       }
  //       return item;
  //     });
  //     const response = await axiosInstance.post("/decreaseCartItemQuantity", { productId });
  //     console.log("Decrease Quantity Response Status:", response.status); // Log the response status
  //     if (response.status === 201) {
  //       setMessage(response.data.message);
  //       setShowPopup(true);
  //       setTimeout(() => {
  //         setShowPopup(false);
  //       }, 1000);
  //       fetchProduct();
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 1000);
  //     console.error('Error:', error);
  //   } finally {
  //     setConfirmDelete(false);
  //   }
  // };

  const handleRemoveFromCart = async (productId) => {
    try {
      setConfirmDelete(true); // Set confirmDelete to true to open the confirmation dialog
      setProductIdToRemove(productId); // Save productId to state
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      console.error('Error:', error);
    }
  };

  const handleConfirmRemove = async () => {
    try {
      // Perform the removal from cart using productIdToRemove
      const response = await axiosInstance.delete(`/removeCartItems/${productIdToRemove}`);
      if (response.status === 201) {
        setMessage(response.data.message);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
        fetchProduct();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      console.error('Error:', error);
    } finally {
      setConfirmDelete(false);
    }
  };



  const handleAddToWishlist = async (curElm) => {
    try {
      const existingWishlistItem = wishlistItems.find(
        (item) => item.product === curElm._id
      );

      if (existingWishlistItem) {
        console.log("Product already in wishlist");
      } else {
        const requestBody = {
          user: userId._id,
          wishlistItem: [
            {
              product: curElm.product,
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
              image: curElm.image,
            },
          ],
        };

        const response = await axiosInstance.post("/addItemToWishlist", requestBody);

        if (response.status === 201) {
          setMessage(response.data.message);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate('/WishList');
          }, 1000);
        } else {
          // Handle unexpected response status
          console.error("Unexpected response status:", response.status);
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'An error occurred while adding to wishlist');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      console.error('Error:', error);
    }
  };


  const handleSizeChange = (size, index, productId) => {
    
    console.log("Size: ", size);
    console.log("Index: ", index);
    console.log("Product ID: ", productId);

    const sizePrice = index * 500; // Adjusted for starting from 0 and increasing by 5000
    // Update sizePrice state with the new value for the productId
    setsizePrice(prevSizePrice => ({
      ...prevSizePrice,
      [productId]: sizePrice
    }));
    setSelectedSize({ [productId]: size });
    
  };

  const handleDiamondType = (type, productId, selectedIndex) => {
    console.log(type); // This should log the selected diamond type
    console.log(productId); // This should log the productId
    console.log(selectedIndex); // This should log the index of the selected option

    const sizePrice = selectedIndex * 15000; // Adjusted for starting from 0 and increasing by 15000

    // Update diamondTypePrice state with the new value for the productId
    setdiamondTypePrice(prevDiamondTypePrice => ({
      ...prevDiamondTypePrice,
      [productId]: sizePrice
    }));
    setSelectedDiamondType({ [productId]: type });
};

  const handleGoldKt = (karat, productId, selectedIndex) => {
   
    console.log(karat); // This should log the selected karat
    console.log(productId); // This should log the productId
    console.log(selectedIndex); // This should log the index of the selected option
    const sizePrice = selectedIndex * 5000; // Adjusted for starting from 0 and increasing by 5000

    // Update goldKtPrice state with the new value for the productId
    setgoldKtPrice(prevGoldKtPrice => ({
      ...prevGoldKtPrice,
      [productId]: sizePrice
    }));
    setSelectedGoldKt({ [productId]: karat });
  };

  const handleGoldtype = (karat, index) => {

  };


  const convertToNumericValue = (formattedValue) => {
    if (typeof formattedValue !== 'string') {
      console.error('Invalid formatted value:', formattedValue);
      return 0; // Or handle this case according to your requirements
    }

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
    calculateFinalTotal(originalTotalPrice.toString(), sizePrice, diamondTypePrice, goldKtPrice, quantities);
  }, [originalTotalPrice, sizePrice, diamondTypePrice, goldKtPrice, quantities]);

  const calculateFinalTotal = () => {
    const updatedCartItem = cartItem.map(item => {
      const productId = item._id;

      // Retrieve the price components for the current product
      const originalPrice = convertToNumericValue(originalTotalPrice[productId]);
      const sizePriceValue = sizePrice[productId] || 0;
      const diamondTypePriceValue = diamondTypePrice[productId] || 0;
      const goldKtPriceValue = goldKtPrice[productId] || 0;
      const quantities = item.quantity || 0; // Retrieve the quantity of the current item

      // Calculate subtotal for the current product
      const subtotal = (originalPrice + sizePriceValue + diamondTypePriceValue + goldKtPriceValue) * quantities;

      // Convert subtotal to Indian format
      const formattedSubtotal = convertToIndianFormat(subtotal.toString());

      // Set final total for the current product
      setfinalTotal(prevFinalTotal => ({
        ...prevFinalTotal,
        [productId]: formattedSubtotal
      }));

      return {
        ...item,
        finalTotal: formattedSubtotal
      };
    });

    // Update the cartItem state with the updatedCartItem
    setCartItem(updatedCartItem);
  };




  return (
    <div className="cart container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h1 className="cart-header">My Shopping Cart</h1>
          {cartItem.map((curElm) => (
            <div className="cart-box" key={curElm._id}>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="image"
                    src={`http://localhost:2000${curElm.image}`}
                    alt={curElm.name}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="card-content">{curElm.name}</h1>
                    </div>
                    <h3>{curElm.Cat}</h3>
                  </div>
                  <div className="row mt-3 p-2">
                    <div className="col-md-12">
                      <h1 className="price">
                        ₹{curElm.finalTotal}/-
                      </h1>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <div className="cart-quantity">
                        <label className="card-content fs-2 p-3">
                          Quantity:{" "}
                        </label>
                        <button
                          className="quantity-button"
                          onClick={() => handleUpdate(curElm._id, 'decrease')}
                        >
                          -
                        </button>
                        <span className="quantity fs-3">{curElm.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => handleUpdate(curElm._id, 'increase')}
                        >
                          +
                        </button>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="col">
                        <label>Select Sizes:</label>
                        {customizedDetails[curElm.product] && customizedDetails[curElm.product].product.size && (
                          <select
                          className="design-label fs-3 ml-4"
                          value={curElm.selectedSize}
                          onChange={(e) => {
                            handleSizeChange(e.target.value, e.target.selectedIndex, curElm._id);
                            handleUpdate(curElm._id, 'update');
                          }}
                        >
                          {customizedDetails[curElm.product] && customizedDetails[curElm.product].product.size.map((detail, index) => (
                            <option key={detail} value={detail}>
                              {detail}
                            </option>
                          ))}
                        </select>
                        )}
                      </div>

                      <div className="col-md-6">
                        <div>
                          <label className="design-label fs-3 ml-4">
                            Gold Type:
                          </label>
                          <select
                            className="design-label fs-3 ml-4"
                            value={curElm.selectedGoldtype}
                            onChange={(e) =>
                              handleGoldtype(e.target.value)
                            }
                          >
                            {customizedDetails[curElm.product] &&
                              customizedDetails[
                                curElm.product
                              ].product.goldType.map((detail) => (
                                <option key={detail} value={detail}>
                                  {detail}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label className="design-label fs-3 ml-4">Diamond:</label>
                        {customizedDetails[curElm.product] && customizedDetails[curElm.product].product.diamondType && (
                          <select
                          className="design-label fs-3 ml-4"
                          value={curElm.selectedDiamondType}
                          onChange={(e) => {
                            handleDiamondType(e.target.value, curElm._id, e.target.selectedIndex);
                            handleUpdate(curElm._id, 'update');
                          }}
                        >
                          {customizedDetails[curElm.product].product.diamondType.map((detail, index) => (
                            <option key={index} value={detail}>
                              {detail}
                            </option>
                          ))}
                        </select>
                        )}
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div>
                        <label className="design-label fs-3 ml-4">Gold:</label>
                        {customizedDetails[curElm.product] && customizedDetails[curElm.product].product.goldKt && (
                          <select
                          className="design-label fs-3 ml-4"
                          value={curElm.selectedGoldKt}
                          onChange={(e) => {
                            handleGoldKt(e.target.value, curElm._id, e.target.selectedIndex);
                            handleUpdate(curElm._id, 'update');
                          }}
                        >
                          {customizedDetails[curElm.product].product.goldKt.map((detail, index) => (
                            <option key={index} value={detail}>
                              {detail}
                            </option>
                          ))}
                        </select>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <button
                        className="remove-button"
                        onClick={() => {
                          handleRemoveFromCart(curElm._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="col-md-4">
                      <Link to="/wishlist">
                        <button
                          className="wishlist-button fs-3"
                          onClick={() => handleAddToWishlist(curElm)}
                        >
                          Add to Wishlist
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" col-md-4">
          <div className="order-summary-box">
            <h3 className="order1">
              <b>Order Summary</b>
            </h3>
            <p className="length">
              Total Products: {cartItem.length}
            </p>
            <p className="length">
              Total Price: ₹{ }
            </p>
            <div className="Gift">
              <p>
                Gift Message
                (Optional)

              </p>
              <button onClick={handleShow} style={{ border: "none" }}>
                <IoGiftSharp

                  style={{ fontSize: "20px", color: "#4f3267", marginTop: "-15px" }}
                />
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header
                  closeButton
                  style={{ fontFamily: "'Domine', serif" }}
                >
                  <Modal.Title
                    style={{ marginLeft: "120px", fontSize: "18px" }}
                  >
                    <b>ADD YOUR GIFT MESSAGE</b>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="text"
                    placeholder="Recipient's Name"
                    style={{
                      fontSize: "16px",
                      width: "470px",
                      height: "50px",
                      paddingLeft: "20px",
                      fontFamily: "'Domine', serif",
                    }}
                  />{" "}
                  <br></br>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{
                      fontSize: "16px",
                      width: "470px",
                      marginTop: "20px",
                      height: "50px",
                      paddingLeft: "20px",
                      fontFamily: "'Domine', serif",
                    }}
                  />{" "}
                  <br></br>
                  <textarea
                    rows="5"
                    columns="80"
                    placeholder="Your Message"
                    style={{
                      fontSize: "16px",
                      width: "470px",
                      marginTop: "20px",
                      paddingLeft: "20px",
                      fontFamily: "'Domine', serif",
                    }}
                  ></textarea>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={handleClose}
                    style={{
                      fontSize: "18px",
                      background:
                        "linear-gradient(to right,#DE57E5 0%,#8863FB 100%)",
                      border: "none",
                      marginRight: "180px",
                    }}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
            <button className="placeorder-button">CHECK OUT</button>
            <div className="Vocher">
              <p onClick={() => setShowVoucherInput(!showVoucherInput)}>
                I have a voucher code / gift card
              </p>
              {showVoucherInput && (
                <div className="Vocher-Card" style={{ fontFamily: "Mulish,sans-serif" }}>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    style={{
                      width: "300px",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #DE57E5",
                      borderRadius: "10px 0 0 10px",
                    }}
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="voucher-apply-button"

                  >
                    Apply
                  </button>

                </div>
              )}
              <p style={{ marginTop: "30px" }}>
                Any Questions? <br />
                Please call us at <b>18004190066</b>{" "}
              </p>{" "}
              <br />
            </div>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={handleConfirmRemove}
        />
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

export default Cart;