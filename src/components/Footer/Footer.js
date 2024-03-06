import { React, useEffect } from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import "./Footer.css";
import { AiFillInstagram } from "react-icons/ai";
import playstore from "../../images/pay/play.jpg";
import appstore from "../../images/pay/app.jpg";
import visa from "../../images/pay/pay.png";
import { Link, useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [location.pathname]);

  return (
    <div className="footer">
      <footer className="footer p-5">
        <div className="container-xxl">
          <div className="row justify-content-center justify-content-md-start">
            <div className="col-md-4 col-lg-3 mb-4 mb-md-0 ">
              <h2 className="footer-title mb-3">
                <b>CONTACT</b>
              </h2>
              <div className="footer-content mb-3">
                <p>
                  <b>Address:</b> Banjara Hills, Hyd 8-2-626/2 Road No. 10,
                  Banjara Hills, Hyderabad-500034, Telangana, India
                </p>{" "}
              </div>
              
              <div className="foote">
                <p>
                  <b>Phone:</b>{" "}
                  <a className="footer-tel" href="tel:+1234567890">
                    Call us at 18001236547
                  </a>
                </p>{" "}
              </div>
              <div className="footer-content mb-3">
                <p>
                  <b>Hours:</b> From 10 a.m To 7 p.m
                </p>{" "}
              </div>
              <div className="footer-content mb-4">
                <p>
                  <b>Email:</b> support@chatoyer.net{" "}
                </p>
              </div>
              <div className="footer-content mb-3">
                <p>
                  <b>Follow Us</b>
                </p>{" "}
              </div>
              <div className="socials d-flex gap-3">
                <div className="buttons fs-2">
                  <a href="https://www.linkedin.com/login">
                  <BsLinkedin />
                  </a>
                </div>
                <div className="buttons fs-2">
                  <a href="https://www.facebook.com/">
                  <BsFacebook />
                  </a>
                </div>
                <div className="buttons fs-2">
                <a href="https://www.instagram.com/accounts/login/?hl=en">
                  <AiFillInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
              <h2 className="footer-title mb-3">
                <b>CATEGORY</b>
              </h2>
             
              <Link to="/Rings">
                <div className="footer-content mb-3">Rings</div>
              </Link>
              <Link to="/Earrings">
                <div className="footer-content mb-3">Earrings</div>
              </Link>
              <Link to="/Bangles">
                <div className="footer-content mb-3">Bangles</div>
              </Link>
              <Link to="/Chains">
                <div className="footer-content mb-3">Chains</div>
              </Link>
              <Link to="/Pendants">
                <div className="footer-content mb-3">Pendants</div>
              </Link>
            </div>
            <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
              <h2 className="footer-title mb-3">
                <b>POLICIES</b>
              </h2>
              <Link to="/Disclaimer">
                <div className="footer-content mb-3">Disclaimer</div>
              </Link>
              <Link to="/PrivacyPolicy">
                <div className="footer-content mb-3">Privacy Policy </div>
              </Link>
              <Link to="/ShippingPolicy">
                <div className="footer-content mb-3">Shipping Policy</div>
              </Link>
              <Link to="/ReturnPolicy">
                <div className="footer-content mb-3">Return Policy </div>
              </Link>
              <Link to="/TermsCondition">
                <div className="footer-content mb-3">Terms & Conditions </div>
              </Link>
              <Link to="/AboutUs">
                <div className="footer-content mb-3">About Us </div>
              </Link>
            </div>
            <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
              <h2 className="footer-title mb-3">
                <b>ACCOUNT</b>
              </h2>
              <Link to="/Profile">
                <div className="footer-content mb-3"> Profile </div>
              </Link>
              <Link to="/Cart">
                <div className="footer-content mb-3">View Cart</div>
              </Link>
              <Link to="/checkout">
                <div className="footer-content mb-3">Payments </div>
              </Link>
              <Link to="/Wishlist">
                <div className="footer-content mb-3">My Wishlist </div>
              </Link>
             
            </div>
            <div className="col-md-4 col-lg-3 ">
              <h2 className="footer-title mb-3">
                <b>INSTALL APP</b>
              </h2>
              <p className="footer-content mb-3">
                Available On Google Play Services & App Store
              </p>
              <div className="className='mb-3 col-md-6 col-12 pay">
                <div className="footer-content mb-3">
                  <img src={playstore} alt="" />
                </div>
                <div className="mb-3">
                  <img src={appstore} alt="" />
                </div>
              </div>
              <p className="mb-3">Payment Methods</p>
              <div className="pay">
                <img src={visa} alt="" />
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-12 ">
              <p className="text-center text-md-end fs-5">
                <p className="footer-content">
                  &copy; 2023 Chatoyer Developed by <b>Truquest Infotech.</b>
                </p>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;