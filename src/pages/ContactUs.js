// components/ContactPage.js
import React from 'react';
import './ContactUs.css'; // Import styles
import ContactForm from './ContactForm';
import Contact from './Contact';

const ContactPage = () => {
  return (
    <> 
    <div className="contact-page">
      
      <ContactForm />
      <Contact />
    </div>
    </>
  );
};

export default ContactPage;
