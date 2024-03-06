import React from 'react';
import './AboutPage.css';

import LogoImage from "../images/Logo/Logo.png";
function AboutPage() {
  
  return (
    <div className="about-page">
      <div className="faces">
        <h1><b>ABOUT US</b></h1>
      </div>
      <div className="about-content">
        <div className="about-left">
          {/* <img src="https://res.cloudinary.com/du9ucrizw/image/upload/v1695187886/Screenshot__29_-removebg-preview_ooolqo.png" alt="About Us" /> */}
          <img className="Logo" src={LogoImage} alt="logo" />
        </div>
        <div className="about-right">
        <p>Chatoyer Group was founded in 1993 by a team of enterprising entrepreneurs, 
          led by the visionary genius of Mr. M P Ahammed when he explored beyond his immediate 
          circle in the agri-corp industry to establish a jewellery trading company in a historical 
          city called Chatoyer. Since then, keeping alive the golden spirit of the brand, the Group 
          has remained constant, in its successful forays nurtured by expertise, vision and guidance, 
          into a formidable business conglomerate. he HQ (headquarters) of Chatoyer Group located in 
          Hydrabad shines bright as a beacon of success for an empire built on Trust, Teamwork, and 
          Goodwill.</p>
        </div>
      </div>
      <h1 className="faces">FACES OF CHATOYER JEWELERY</h1>
      <p className="over">Over the years the brand has transformed itself to be relevant with the changing times.
      It has also had many celebrities who have excelled in their area of expertise endorse the brand. They include:</p>
      <div className="image-row">
        <div className="image-box">
          <img src="https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/MGDAPP/about-us/images/Jr_Ntr.jpg" alt="Product 1" />
         </div>
        <div className="image-box">
          <img src="https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/MGDAPP/about-us/images/Alia.jpg" alt="Product 2" />
          
        </div>
        <div className="image-box">
          <img src="https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/MGDAPP/about-us/images/anil-kapur.jpg" alt="Product 3" />
          
        </div>
        <div className="image-box">
          <img src="https://static.malabargoldanddiamonds.com/media/wysiwyg/website-pages/2017/01_jan/about-us/faces/face1.jpg" alt="Product 4" />
          
        </div>
        <div className="image-box">
          <img src="https://static.malabargoldanddiamonds.com/media/wysiwyg/website-pages/2017/01_jan/about-us/faces/face3.jpg" alt="Product 5" />
        </div>
      </div>
    <div>
        <p className="faces">CHATOYER JEWELERY</p>
        <p className="esg">ESG (Environmental, Social & Governance) initiatives have been the primary commitment of the group since its inception in 1993, with 5% of net profits set towards such activities in each country of operation. The main focus of the group’s CSR activities is in the areas of Health, Education, Housing, Hunger Free World, Environment and Women empowerment. The principles of sustainability and responsibility are incorporated into its core business through practices such as:</p>
        
    <list className="list">
            <li>Responsible sourcing</li>
            <li>Zero tolerance on compliance</li>
            <li>Anti-money laundering (AML) & combating the financing of terrorism (CFT)</li>
            <li>FSC (forest stewardship council) wood used for packaging.</li>
            <li>LEED Gold certified offices and outlets</li>
        </list>
        <p className="esg">Our dreams are still young and we are raring to go further. 
        We have recorded an astounding growth constantly for past many years. Driven by 
        uncompromised quality in products and services, trust and transparency, we could outperform 
        the industry standards. Our growth is never by mere chance; it is the result of forces 
        working together to make it happen.</p>
        <p className="faces">Our journey continues</p>
    </div>
    </div>
  );
}

export default AboutPage;