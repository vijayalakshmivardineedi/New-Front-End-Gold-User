
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import { BiSolidCart, BiSolidUserCircle } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import LogoImage from "../../images/Logo/Logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../helpers/axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in based on localStorage
  const auth = localStorage.getItem("UserToken") ? true : false;

  useEffect(() => {
    axiosInstance.get("/getAllProducts")
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Products data is not an array:", response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchInputChange = (value) => {
    if (Array.isArray(products)) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    navigate(`/description/${suggestion._id}`);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    const limitedSuggestions = suggestions.slice(0, 10);

    return (
      <Dropdown.Menu show={limitedSuggestions.length > 0} className="suggestions-dropdown">
        {limitedSuggestions.map((suggestion) => (
          <Dropdown.Item key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)} className="text-dark">
           
              {suggestion.name}
          
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>

    );
  };

  const handleLogout = async () => {
    try {
      // Perform logout actions
      localStorage.clear();
      setMessage("Logged out successfully.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login')
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error
    }
  };
  const handleWishlistClick = () => {
    if (!auth) {
      // Display popup or perform other actions for non-authenticated user
      // For example, you can set a state variable to show a popup
      // setShowLoginPopup(true);
      alert("Please log in to access Wishlist.");
      return;
    }

    navigate("/Wishlist");
  };

  const handleCartClick = () => {
    if (!auth) {
      // Display popup or perform other actions for non-authenticated user
      // For example, you can set a state variable to show a popup
      // setShowLoginPopup(true);
      alert("Please log in to access Cart.");
      return;
    }

    // Navigate to Cart for authenticated user
    navigate("/Cart");
  };
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  
  

  return (
    <>
      <nav className="custom-navbar"></nav>
      <div className="navbar">
        <Navbar expand="lg" bg="white" className="py-2 shadow-sm">
          <div className="container-fluid">
            <Navbar.Brand className="fs-3">
              <div className="logo-container">
                <Nav.Link as={Link} to="/">
                  <img className="Logo" src={LogoImage} alt="logo" />
                </Nav.Link>
              </div>
            </Navbar.Brand>
            <div className="chatoyer">
              <Nav.Link as={Link} to="/">
                Chatoyer
              </Nav.Link>
            </div>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
              <Nav className=" p-2 mx-auto mb-0 mb-lg-0">
             
                <Nav.Item className="navbar-nav fs-4 p-2">
                  <Nav.Link as={Link} to="/Rings" className=" nav-link fs-4">
                    <p className="headercat">RINGS</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navbar-nav fs-4 p-2">
                  <Nav.Link as={Link} to="/Earrings" className=" nav-link fs-4">
                    <p className="headercat">EARRINGS</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navbar-nav fs-4 p-2">
                  <Nav.Link as={Link} to="/Pendants" className="nav-link fs-4">
                    <p className="headercat">PENDANTS</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navbar-nav fs-4 p-2">
                  <Nav.Link as={Link} to="/Chains" className="nav-link fs-4">
                    <p className="headercat">NECKLACE</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navbar-nav fs-4 p-2">
                  <Nav.Link as={Link} to="/Bangles" className="nav-link fs-4">
                    <p className="headercat">BANGLES</p>
                  </Nav.Link>
                </Nav.Item>
              
              </Nav>
              <div>
                <div className="search-container">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search "
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleSearchInputChange(e.target.value);
                    }}
                  />
                  <button type="button" className="search-button ">
                    <FaSearch />
                  </button>
                </div>
                {renderSuggestions()}
              </div>

              <div className="menu p-2 ">
                <Dropdown show={showUserDropdown} onToggle={toggleUserDropdown}>
                  <Dropdown.Toggle variant="light" id="user-dropdown" className="header-buttons p-2">
                    <BiSolidUserCircle className="react-icon-header" />
                  </Dropdown.Toggle>
                  
                    {auth ? (
                    <Dropdown.Menu className="drop-menu fs-2" style={{ width: "100px", right: 50, transform: "translateX(-70%) translateY(10%)" }}>
                      <Dropdown.Item as={Link} to="/Profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/MyOrders">
                        MyOrders
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    ) : (
                    <>
                    <Dropdown.Menu className="drop-menu fs-2" style={{ width: "400px", right: 50, transform: "translateX(-70%) translateY(10%)" }}>
                      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "30px" }}>Your Account</h1>
                      <h2 style={{ textAlign: "center" }}>Access account & manage your orders.</h2>
                      <Link to="/Signup">
                        <button style={{ marginTop: "20px", marginLeft: "65px", border: "none", borderRadius: "10px", marginBottom: "10px", background: "linear-gradient(to right,#DE57E5 0%,#8863FB 100%)", color: "white", width: "120px", padding: "8px", fontSize: "22px" }}>Sign Up</button>
                      </Link>
                      <Link to="/Login">
                        <button style={{ marginLeft: "65px", borderRadius: "10px", color: "black", padding: "8px", width: "120px", fontSize: "22px", background: "#fff", border: "3px solid #e56eeb" }}>Log In</button>
                      </Link>
                    </Dropdown.Menu>
                   </>
                    )}
                 
                </Dropdown>
              </div>

              <div className="header-buttons p-2">
        <div onClick={handleWishlistClick} className="btn btn-light fs-5">
          <AiFillHeart className="react-icon-header" />
        </div>
      </div>
      <div className="header-buttons p-2">
        <div onClick={handleCartClick} className="btn btn-light fs-5">
          <BiSolidCart className="react-icon-header" />
        </div>
      </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
        {showPopup && (
          <div className="popup">
            <div className="popup-content-big">
              <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
              <p>{message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;