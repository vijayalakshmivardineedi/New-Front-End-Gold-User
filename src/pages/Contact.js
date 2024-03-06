import React from "react";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
const Contact = () => {
  return (
    <div className="description">
      <h2>Welcome to Our Contact Page</h2>
    
        <b>Corture Jewelery</b>
    
      <p>
        <FiMail /> corturejewelery@support.com
      </p>
      <p>
        <b>
          <FiPhoneCall />
        </b>{" "}
        +91 98456 23985
      </p>
      <p>
        <b>
          <FaLocationDot />
        </b>{" "}
        Hydrabad
      </p>
    </div>
  );
};

export default Contact;
