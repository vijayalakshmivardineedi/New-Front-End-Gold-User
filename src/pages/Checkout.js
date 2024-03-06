import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "./Checkout.css";
import axios from "axios";
import OrderSuccess from "./OrderPlaced";
import visa from "../images/pay/pay.png";
import { BsCurrencyRupee } from "react-icons/bs";

const Checkout = ({ removeFromOrder }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedSize, setSelectedSize] = useState(1); // Initialize size to 1
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [getAddress, setGetAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    address: "",
    street: "",
    town: "",
    state: "",
    makeDefault: false,
  });
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quantityState, setQuantityState] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const [isActive, setIsActictive] = useState(false);
  const order = [];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setAddress({
      ...address,
      [name]: newValue,
    });
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const dataBody = {
    user: userId._id,
    address: [
      {
        name: address.fullName,
        mobileNumber: address.mobile,
        pinCode: address.pincode,
        address: address.address,
        street: address.street,
        cityDistrictTown: address.town,
        state: address.state,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/address/create",
        dataBody,
        options
      );
      // Handle response as needed
      console.log(response, "address successfully added");

      setShowAddressForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //const[qty,setQty]=useState(0)

  useEffect(() => {
    const initialTotalQuantity = order.reduce((total, product) => {
      const quantity = quantityState[product.id] || 1;
      return total + quantity;
    }, 0);

    setTotalQuantity(initialTotalQuantity);
  }, [order, quantityState]);

  const handleRemoveFromOrder = (product) => {
    removeFromOrder(product);
    setQuantityState((prevQuantity) => {
      const newState = { ...prevQuantity };
      const removedQuantity = newState[product.id] || 0;
      delete newState[product.id];
      setTotalQuantity(
        (prevTotalQuantity) => prevTotalQuantity - removedQuantity
      );
      return newState;
    });
  };
  useEffect(() => {
    const totalPrice = order.reduce((total, curElm) => {
      const numericPrice = parseFloat(curElm.Price.replace(/[^\d.]/g, ""));
      const quantity = quantityState[curElm.id] || 1;
      return !isNaN(numericPrice) ? total + numericPrice * quantity : total;
    }, 0);

    setTotalPrice(totalPrice);
  }, [order, quantityState]);

  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,

      // Add any other headers you require
    },
  };

  const [isDesignVisible, setIsDesignVisible] = useState(false);

  const handleCustomizeOrderClick = () => {
    setIsDesignVisible(true);
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/user/cart/getCartItems`,
          config
        );
        if (response) {
          setCartItem(response.data.cartItems); // Ensure product is an object
        } else {
          console.error("Product not found!");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [_id]);

  const calculateTotalPrice = () => {
    const totalPrice = cartItem.reduce((total, item) => {
      // Remove commas and parse the total as a floating-point number
      const itemTotal = parseFloat(item.total.replace(/,/g, ""));
      return total + item.quantity * itemTotal;
    }, 0);

    // Format the total price with commas
    return totalPrice.toLocaleString();
  };

  const getPriceFromCart = () => {
    return cartItem.map((item) => parseFloat(item.total.replace(/,/g, "")) * item.quantity);
  };

  const getProductIdFromCart = () => {
    return cartItem.map((item) => item.product);
  };

  const getQuantityFromCart = () => {
    return cartItem.map((item) => item.quantity);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/user/getaddress`,
          config
        );
        if (response) {
          // Ensure product is an object
          setGetAddress(response.data.userAddress.address);
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchAddress();
  }, [_id]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handleAddCardClick = () => {
    setShowCardForm(true);
  };

  const handleAddAddressClick = () => {
    setShowAddressForm(!showAddressForm);
  };

  // Save Orders Function

  // Function to handle selecting an address
  const handleSelectAddress = (selectedAddressData) => {
    setSelectedAddress(selectedAddressData);
  };

  // Function to handle selecting a payment option
  const handleSelectPaymentOption = (paymentOption) => {
    setSelectedPaymentOption(paymentOption);
  };
  const saveOrderToDatabase = async () => {
    console.log("Selected Address Data:", selectedAddress);
    try {
      if (!selectedAddress) {
        console.error("Please select an address.");

        return; // Don't proceed if address is not selected
      }

      if (!selectedPaymentOption) {
        console.error("Please select a payment option.");
        return; // Don't proceed if payment option is not selected
      }

      // Prepare the order data
      const orderData = {
        user: userId._id,
        addressId: selectedAddress, // Set the selected address
        totalAmount: calculateTotalPrice(),

        // Set the selected payment option
        items: cartItem.map((item) => ({
          productId: item.product,
          productImage: item.image, // Assuming item.product is the ObjectId
          payablePrice: parseFloat(item.total)* item.quantity, // Calculate the payable price
          purchasedQty: item.quantity, // Set the purchased quantity
        })),
        paymentType: selectedPaymentOption,
        orderStatus: [
          {
            date: new Date(),
          },
        ],
      };

      // Log the orderData to check if it's correct
      console.log("Order Data:", orderData);

      // Send a POST request to save the order data to the database
      const response = await axios.post(
        "http://localhost:2000/api/addOrder",
        orderData,
        options
      );

      // Log the response to check the server's response
      console.log("Server Response:", response.data);

      // Handle the response as needed, e.g., show a success message
      console.log("Order placed successfully:", response.data);

      // You can also clear the cart and reset selectedAddress and selectedPaymentOption here
      // Clear the cart
      setCartItem([]);
      // Reset selectedAddress and selectedPaymentOption

      setSelectedAddress(null);
      setSelectedPaymentOption("");
      navigate("/OrderPlaced");
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle the error, e.g., show an error message
    }
  };
  console.log(selectedAddress);
  console.log(selectedPaymentOption);
  console.log(cartItem);
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/cart/removeCartItems",
        { productId },
        config
      );

      if (response && response.data.result) {
        setCartItem((prevCart) =>
          prevCart.filter((item) => item._id !== productId)
        );
      } else {
        console.error("Error removing item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      const updatedCartItem = cartItem.map((item) => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      const response = await axios.post(
        "http://localhost:2000/api/user/cart/increaseCartItemQuantity",
        { productId }, // Send only the productId
        config
      );

      console.log("Increase Quantity Response:", response.data);

      if (response && response.data.cart) {
        setCartItem(updatedCartItem);
      } else {
        console.error("Error updating cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  const handleDecreaseQuantity = async (productId) => {
    try {
      const updatedCartItem = cartItem.map((item) => {
        if (item._id === productId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      const response = await axios.post(
        "http://localhost:2000/api/user/cart/decreaseCartItemQuantity",
        { productId }, // Send only the productId
        config
      );

      console.log("Decrease Quantity Response:", response.data);

      if (response && response.data.cart) {
        setCartItem(updatedCartItem);
      } else {
        console.error("Error updating cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="order-card">
            <center>
              <h1 className="checkout-header">Check Out</h1>
            </center>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <p className="accordion_head">1. Delivery Information</p>
                </Accordion.Header>
                <Accordion.Body>
                  <h4>Default Delivery Address</h4>
                  <ul className="address-details">
                    {getAddress.map((eachAddress) => (
                      <div className="row mt-3">
                        <div className="col-md-1">
                          <a
                            className="useAddress"
                            href="#PaymentMethodsSection"
                            onClick={() => {
                              setIsActictive(true);
                            }}
                          >
                            <input
                              type="radio"
                              id="radio"
                              name="options"
                              // onChange={handleSelectAddress}
                              onClick={() => setSelectedAddress(eachAddress)}
                              defaultChecked
                              value={selectedAddress}

                              // checked={selectedOption === 'option1'}
                              //  onChange={() => setSelectedOption('option1')}
                            />
                          </a>
                        </div>
                        <div className="col-md-11">
                          <li
                            key={eachAddress._id}
                            onClick={() => setSelectedAddress(eachAddress)}
                            className="checkout-list-style"
                            style={{ listStyleType: "none" }}
                            value={selectedAddress}
                          >
                            <b className="Name fs-1">{eachAddress.name}</b>
                            <br />
                            <p className="Address fs-2">
                              {eachAddress.address},{eachAddress.street},
                              {eachAddress.cityDistrictTown},{eachAddress.state}
                              , India , {eachAddress.pinCode}
                            </p>
                          </li>
                        </div>
                      </div>
                    ))}
                  </ul>

                  <button
                    className="checkout-button"
                    onClick={handleAddAddressClick}
                  >
                    {" "}
                    + Add Address
                  </button>
                  {showAddressForm && (
                    <form
                      className="row g-3 needs-validation form"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="input-container">
                        <label className="form-label">Full name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={address.fullName}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="input-container">
                        <label className="form-label">Mobile:</label>
                        <input
                          type="text"
                          name="mobile"
                          value={address.mobile}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="input-container">
                        <label className="form-label">Pincode:</label>
                        <input
                          type="text"
                          name="pincode"
                          value={address.pincode}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="input-container">
                        <label className="form-label">
                          Flat, House no., Building, Company, Apartment:
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={address.address}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="input-container">
                        <label className="form-label">
                          Area, Street, Sector, Village:
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={address.street}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      {/* <div className="input-container">
              <label className="form-label">Landmark:</label>
              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div> */}
                      <div className="input-container">
                        <label className="form-label">Town/City:</label>
                        <input
                          type="text"
                          name="town"
                          value={address.town}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="input-container">
                        <label className="form-label">State:</label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <input
                        type="submit"
                        name="Submit"
                        className="checkout-submit"
                      />
                    </form>
                  )}
                  <a
                    className="useAddress"
                    href="#PaymentMethodsSection"
                    onClick={() => {
                      setIsActictive(true);
                    }}
                  >
                    {/*<button
                      className="checkout-button"
                      style={{ marginLeft: "25px" }}
                    >
                      Use this address
                    </button>*/}
                  </a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" id="PaymentMethodsSection" >
                <Accordion.Header>
                  <p className="accordion_head">2. Payment Method</p>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="payment-headings">
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <input
                        type="radio"
                        id="creditDebitCard"
                        value="creditDebitCard"
                        checked={selectedPaymentOption === "creditDebitCard"}
                        onChange={handlePaymentOptionChange}
                      />
                    </a>
                    <label htmlFor="creditDebitCard" className="radio_check">
                      Credit or Debit Card
                    </label>
                    <img src={visa} alt="payment" />
                  </div>
                  {/* Display card details form when creditDebitCard is selected */}
                  {selectedPaymentOption === "creditDebitCard" && (
                    <div>
                      <h2 className="checkout-card mt-2 ">
                        {" "}
                        Add Card Details{" "}
                      </h2>
                      <div className="checkout-inputbox mt-4">
                        <input
                          type="text"
                          name="name"
                          className="checkout-form-control"
                          required="required"
                        />
                        <span className="add_span">Name on card</span>
                      </div>
                      <div className="row ">
                        <div className="col-md-6 mt-4">
                          <div className="checkout-inputbox">
                            <input
                              type="text"
                              name="name"
                              className="checkout-form-control"
                              required="required"
                            />
                            <i className="fa fa-credit-card fs-1"></i>{" "}
                            <span className="add_span">Card Number</span>
                          </div>
                        </div>

                        <div className="col-md-6 mt-4">
                          <div className="d-flex flex-row ">
                            <div className="checkout-inputbox">
                              <input
                                type="text"
                                name="name"
                                className="checkout-form-control"
                                required="required"
                              />
                              <span className="add_span">Expiry</span>
                            </div>

                            <div className="checkout-inputbox">
                              <input
                                type="text"
                                name="name"
                                className="checkout-form-control"
                                required="required"
                              />
                              <span className="add_span">CVV</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Radio button for Net Banking */}
                  <div className="payment-headings">
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <input
                        type="radio"
                        id="netBanking"
                        value="netBanking"
                        checked={selectedPaymentOption === "netBanking"}
                        onChange={handlePaymentOptionChange}
                      />
                    </a>
                    <label htmlFor="netBanking" className="radio_check">
                      Net Banking
                    </label>
                  </div>
                  {selectedPaymentOption === "netBanking" && (
                    <div>
                      <select
                        className="form-select-checkout fs-4"
                        aria-label="Default select"
                      >
                        <option selected>
                          <h4>Select your bank</h4>
                        </option>
                        <option value="1">
                          <h5>HDFC Bank</h5>
                        </option>
                        <option value="2">
                          <h5>ICICI Bank</h5>
                        </option>
                        <option value="3">
                          <h5>Kotak Bank</h5>
                        </option>
                        <option value="4">
                          <h5>Axis Bank</h5>
                        </option>
                        <option value="5">
                          <h5>State Bank of India</h5>
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Radio button for Other UPI Apps */}
                  <div className="payment-headings">
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <input
                        type="radio"
                        id="otherUPIApps"
                        value="otherUPIApps"
                        checked={selectedPaymentOption === "otherUPIApps"}
                        onChange={handlePaymentOptionChange}
                      />
                    </a>
                    <label htmlFor="otherUPIApps" className="radio_check">
                      Other UPI Apps
                    </label>
                  </div>
                  {selectedPaymentOption === "otherUPIApps" && (
                    <div className="upi">
                      <label htmlFor="upiId" className="fs-4">
                        Please enter your UPI ID
                      </label>
                      <div>
                        <input type="text" id="upiId" className="upiId" />
                        <button className="checkout-button fs-5">Verify</button>
                      </div>
                    </div>
                  )}

                  {/* Radio button for EMI */}
                  <div className="payment-headings">
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <input
                        type="radio"
                        id="emi"
                        value="emi"
                        checked={selectedPaymentOption === "emi"}
                        onChange={handlePaymentOptionChange}
                      />
                    </a>
                    <label htmlFor="EMI" className="radio_check">
                      EMI
                    </label>

                    {selectedPaymentOption === "emi" && (
                      <div>
                        <div>
                          <button
                            className="checkout-button fs-5"
                            onClick={handleAddCardClick}
                          >
                            {" "}
                            Add Card{" "}
                          </button>
                          <img src={visa} alt="payment" />
                        </div>
                        {showCardForm && (
                          <div>
                            <h2 className="checkout-card ">
                              {" "}
                              Add Card Details{" "}
                            </h2>
                            <div className="checkout-inputbox mt-4">
                              <input
                                type="text"
                                name="name"
                                className="checkout-form-control"
                                required="required"
                              />
                              <span className="add_span">Name on card</span>
                            </div>
                            <div className="row ">
                              <div className="col-md-6 mt-4">
                                <div className="checkout-inputbox">
                                  <input
                                    type="text"
                                    name="name"
                                    className="checkout-form-control"
                                    required="required"
                                  />
                                  <i className="fa fa-credit-card fs-1"></i>{" "}
                                  <span className="add_span">Card Number</span>
                                </div>
                              </div>

                              <div className="col-md-6 mt-4">
                                <div className="d-flex flex-row ">
                                  <div className="checkout-inputbox">
                                    <input
                                      type="text"
                                      name="name"
                                      className="checkout-form-control"
                                      required="required"
                                    />
                                    <span className="add_span">Expiry</span>
                                  </div>

                                  <div className="checkout-inputbox">
                                    <input
                                      type="text"
                                      name="name"
                                      className="checkout-form-control"
                                      required="required"
                                    />
                                    <span className="add_span">CVV</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Radio button for Cash on Delivery/Pay on Delivery */}
                  <div className="payment-headings">
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <input
                        type="radio"
                        id="cashOnDelivery"
                        value="cash On Delivery"
                        checked={selectedPaymentOption === "cash On Delivery"}
                        onChange={handlePaymentOptionChange}
                      />
                    </a>
                    <label htmlFor="cashOnDelivery" className="radio_check">
                      COD ( Cash , UPI and Cards accepted)
                    </label>
                  </div>
                  {/* <div>
                    <a className="useAddress" href="#itemReviewAndPlacedOrders">
                      <button className="checkout-button">
                        Use This Payment
                      </button>
                    </a>
                        </div>*/}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" id="itemReviewAndPlacedOrders" defaultActiveKey={["2"]}alwaysOpen>
                <Accordion.Header>
                  <p className="accordion_head">
                    {" "}
                    3. Item review And Place Order
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  {cartItem.map((curElm) => (
                    <div className="checkout-cart-box">
                      <div className="row">
                        <div className=" col-md-4 " key={curElm._id}>
                          <img
                            className="image"
                            src={`http://localhost:2000${curElm.image}`}
                            alt={curElm.name}
                          />
                        </div>
                        <div className=" col-md-8">
                          <div className="row">
                            <div className="col-md-8">
                              <h1 className="checkout-header">{curElm.name}</h1>
                            </div>
                            <div className=" col-md-3">
                              <h1 className="checkout-header">
                                <BsCurrencyRupee />
                                {curElm.total}
                              </h1>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-6">
                              <label className="checkout-quantity fs-2 p-3">
                                Quantity:{" "}
                              </label>
                              <button
                                className="quantity-button"
                                onClick={() =>
                                  handleDecreaseQuantity(curElm._id)
                                }
                              >
                                -
                              </button>
                              <span className="quantity fs-3">
                                {curElm.quantity}
                              </span>
                              <button
                                className="quantity-button"
                                onClick={() =>
                                  handleIncreaseQuantity(curElm._id)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="checkout-size-design">
                                <div>
                                  <label className="size-label fs-3">
                                    Size: {curElm.size}
                                  </label>
                                </div>
                              </div>
                            </div>{" "}
                            <div className="col-md-6">
                              <div>
                                <label className="design-label fs-3">
                                  Design: {curElm.design}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-6">
                              <button
                                className="checkout-remove-button"
                                onClick={() => {
                                  handleRemoveFromCart(curElm._id);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="col-md-4">
          <div className="order-summary">
            <h3 className="order1">Order Summary</h3>
            <p className="length">Total Products: {cartItem.length}</p>
            <p className="length">Total Price: ₹{calculateTotalPrice()}</p>
            <button className="placeorder-button" onClick={saveOrderToDatabase}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
