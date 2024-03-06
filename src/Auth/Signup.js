import React, { useState, useEffect } from 'react';
import './Signup.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from React Router
import { Api } from '../helpers/axios';
import './PopStyles.css'; // Import CSS file for popup styling
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

const Signup = () => {
    const navigate = useNavigate(); // Invoke useNavigate hook to get the navigate function
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        contactNumber: '',
    });
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.post('/signup', formData);
            if (response.status === 201) {
                setMessage(response.data.message);
                setShowPopup(true);
                // Clear form fields after successful signup
                setFormData({
                    firstName: '',
                    secondName: '',
                    email: '',
                    password: '',
                    contactNumber: '',
                });
                // Delay hiding the popup and navigation by 2 seconds
                setTimeout(() => {
                    setShowPopup(false); // Hide the popup after 2 seconds
                    navigate('/Login'); // Navigate to Dashboard
                }, 2000); // Delay in milliseconds
            }
        } catch (error) {
            setMessage(error.response.data.message || error.response.data.error);
            setShowPopup(true);
            console.error('Signup Error:', error);
            // Delay hiding the popup and navigation by 2 seconds
            setTimeout(() => {
                setShowPopup(false); // Hide the popup after 2 seconds
                // navigate('/Deshboard'); // Navigate to Dashboard
            }, 2000); // Delay in milliseconds
        }
    };

    return (
      <section className="login-wrapper p-5">
      <div className="container-xxl">
          <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                  <div>
                      <div className="card-body p-5">
                          <h1 className="signup-header">Sign Up</h1>
                          <p className="text-center mb-3 fs-3">Join us in shopping!!</p>
                          {showPopup && ( // Display popup only if showPopup is true
                              <div className="popup">
                                  <div className="popup-content-big">
                                      <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                                      <p>{message}</p>
                                  </div>
                              </div>
                          )}
                          <form onSubmit={handleSubmit}>
                              <div >
                                  <input type="text" placeholder="Firstname" 
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleChange}
                                      required
                                      style={{width:"250px", height:"40px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px" , margin:"10px"}}/>
                                  <input type="text" placeholder="Lastname" 
                                      name="secondName"
                                      value={formData.secondName}
                                      onChange={handleChange}
                                      style={{width:"250px", height:"40px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px" , margin:"10px"}}/>
                              </div>
                              <div className="mb-3">
                                  <input type="number" placeholder="Mobile" 
                                      name="contactNumber"
                                      value={formData.contactNumber}
                                      onChange={handleChange}
                                      style={{width:"250px", marginTop:"30px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", height:"40px", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px", margin:"10px"}}/>
                                  <input type="email" placeholder="Enter Email Address"    
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      style={{width:"250px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", height:"40px", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px", margin:"10px"}}/>
                              </div>
                              <div className="mb-3" >
                                  <input type="password" placeholder="Password" 
                                      name="password"
                                      onChange={handleChange}
                                      value={formData.password}
                                      required
                                      style={{width:"250px", height:"30px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", height:"40px", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px", margin:"10px"}}/>
                                  <input type="password" placeholder="Confirm Password" 
                                      name="confirmPassword"
                                      value={formData.confirmPassword}
                                      onChange={handleChange}
                                      required style={{width:"250px", height:"30px", fontSize:"15px", borderRadius:"10px", backgroundColor:"#ede4f0", height:"40px", border:"none", fontFamily:"Times New Roman, Times, serif", paddingLeft:"20px", margin:"10px"}}/>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3 fs-3">
                                  <p className='form-link'>Have an account?</p>
                                  <Link to="/login" className="form-link fs-3" style={{marginRight:"390px", marginBottom:"10px"}}>
                                  Log In
                                  </Link>
                              </div>
                              <div>
                                  <h3 style={{textAlign:"center", fontFamily:"Times New Roman, Times, serif"}}>Or</h3>
                              </div>
                              <div style={{fontSize:"30px", textAlign:"center", marginTop:"20px"}}>
                                  <button style={{border:"none", borderRadius:"50%", margin:"10px"}}><FcGoogle style={{ marginBottom:"5px"}}/></button>
                                  <button style={{border:"none", borderRadius:"50%" ,margin:"10px"}}><ImFacebook2 style={{color:"#316ff6",  marginBottom:"5px"}}/></button>
                              </div>
                              <div className="d-grid gap-2">
                                  <button type="submit" className='signup-button'>Sign Up</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
);
}

export default Signup;