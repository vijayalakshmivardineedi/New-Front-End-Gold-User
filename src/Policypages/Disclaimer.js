import React from "react";
import "./Disclaimer.css";
const Disclaimer = () => {
  
  return (
    <div className="disclaimer_header">
      <div className="disclaimer">
        <h1><b>DISCLAIMER POLICY</b></h1>
      </div>
      <div className="disclaimer-content">
        <p className="paracontent">
          The information contained in this website is for general
          information purposes only. The information is provided by chatoyer
          and while we endeavour to keep the information up to date
          and correct, we make no representations or warranties of any kind,
          express or implied, about the completeness, accuracy, reliability,
          suitability or availability with respect to the website or
          the information, products, services, or related graphics contained on
          the website for any purpose. Any reliance you place on
          such information is therefore strictly at your own risk.
        </p>
        <p className="paracontent">
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arise out of,
          or in connection with, the use of this website.
        </p>
        <p className="paracontent ">
          Through this website, you may be able to link to other
          website which are not under the control of chatoyer. We have no control over the nature, content and
          availability of those sites. The inclusion of any links does not
          necessarily imply a recommendation or endorse the views expressed
          within them.
        </p>
        <p className="paracontent ">
          Every effort is made to keep the website up and running
          smoothly. However, Chatoyer. takes no responsibility for, and
          will not be liable for, the website being temporarily
          unavailable due to technical issues beyond our control.
        </p>
        <p className="paracontent ">
          If there are any questions regarding this websit
          disclaimer policy, you may contact us using the information below:
        </p>
      </div>
      <div className="paracontent">
        <p className="paracontent"><b style={{fontFamily:"'Domine', serif"}}>ADDRESS:</b> Banjara Hills, Hyd 8-2-626/2 Road No. 10, Banjara Hills,
          Hyderabad-500034, Telangana,India
        </p>
        <p className="paracontent"><b style={{fontFamily:"'Domine', serif"}}>CONTACT NUMBER:</b> +91 98456 23985</p>
        <p className="paracontent"><b style={{fontFamily:"'Domine', serif"}}>EMAIL:</b> chatoyer@support.com</p>
      </div>
    </div>
  );
};

export default Disclaimer;