import React, { useState, useEffect } from 'react';
import './Login.css'; // Import the CSS file for styling
import { Api } from '../helpers/axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './PopStyles.css'; // Import CSS file for popup styling

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.post('/signin', formData);
            if (response.status === 200) {
                setMessage(response.data.message);
                setShowPopup(true); // Show popup on successful sign-in
                // Store the signed-in user data in localStorage as an Admin
                localStorage.setItem('UserToken', response.data.token);
                localStorage.setItem('User', JSON.stringify(response.data.user));
                // Delay navigation by 2 seconds (2000 milliseconds)
                setTimeout(() => {
                    setShowPopup(false); // Hide the popup after 2 seconds
                    navigate('/'); // Navigate to Dashboard
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response.data.message || error.response.data.error);
            setShowPopup(true); // Show popup on failed sign-in
            // Delay hiding the popup and navigation by 2 seconds (2000 milliseconds)
            setTimeout(() => {
                setShowPopup(false); // Hide the popup after 2 seconds
                // navigate('/Login'); // Navigate back to Login page
            }, 1000);
            console.error('Signin Error:', error);
        }
    };

    return (
        <div className='login-popup-container'>
        <div className="login-page">
            <h2 className="login-header">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="login-form" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="login-form" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="login-button btn-primary">Sign In</button>
                </div>
            </form>
            <div className="form-group">
                <Link to="/Forgotpassword" className="btn btn-link">Forgot Password</Link>
            </div>
            <div className="form-group">
                <Link to="/signup" className="btn btn-link">Sign Up</Link>
            </div>
            {showPopup && ( // Display popup only if showPopup is true
                <div className="popup">
                    <div className="popup-content-big">
                        <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Login;