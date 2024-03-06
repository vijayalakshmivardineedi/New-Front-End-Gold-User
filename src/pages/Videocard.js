import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import "./Styles.css";
import"../components/ProductPage.css";
const Videocard = (props) => {
  return (
    <div className="product-page">
      <video controls autoPlay muted loop className="product-video">
        <source
          src={props.videoUrl}
          type="video/mp4"
        />
      </video>

      <div className="card-content">
        <h3>{props.title}</h3>
        <p>
          <BsCurrencyRupee />
          {props.description}
        </p>
        <div className="btn-arrangement">
          <button className="button-margin btn btn-light">
            <BsFillEyeFill />
            View Product
          </button>
          <Link to="/Wishlist" className="favorite-style">
            <AiFillHeart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Videocard;
