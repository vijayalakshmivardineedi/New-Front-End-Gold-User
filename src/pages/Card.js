
import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import "./Styles.css"; 

const Card = (props) => {
  return (
    <div className="back-card">
      <img src={props.imageUrl} alt={props.title} />
      <div className="card-content">
        <h3>{props.title}</h3>
        <p><BsCurrencyRupee/>{props.description}</p>
        <div className="btn-arrangement">
            <Link to="/" className="favorite-style">
              < BsFillEyeFill/>
            </Link>
          <Link to="/Wishlist" className="favorite-style">
            <AiFillHeart />
          </Link>
        </div>
      </div>
      </div>

  );
};

export default Card;
