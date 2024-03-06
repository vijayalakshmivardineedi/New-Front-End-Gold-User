import React, { useState, useEffect } from "react";
//import "./Popup.css"; // You should create a CSS file for styling the popup

const Popup = ({ messages, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Console Messages</h2>
        <div className="popup-content">
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
