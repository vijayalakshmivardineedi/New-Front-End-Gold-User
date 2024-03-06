import React, { useState, useEffect } from 'react';
import './ForgotPassword.css'
import { Api } from '../helpers/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ForgotPassword = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false); // Hide the popup after 2 seconds
            }, 1500);

            return () => clearTimeout(timer); // Clear the timer when component unmounts
        }
    }, [showPopup]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'code') setCode(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSendVerificationCode = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.post('/forgotPassword', { email });
            if (response.status === 200) {
                setStep(2); // Move to the next step
                setShowPopup(true); // Show the popup
                setMessage('Verification code sent to your email');
            }
        } catch (error) {
            setMessage('Error: Unable to send verification code');
            console.error('Send Verification Code Error:', error);
            setShowPopup(true); // Show the popup
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setShowPopup(true); // Show the popup
            return;
        }
        try {
            const response = await Api.post('/verifyCodeAndResetPassword', { email, code, newPassword: password });
            if (response.status === 200) {
                setMessage('Password reset successfully');
                setShowPopup(true); // Show the popup
                setTimeout(() => {
                    setShowPopup(false); // Hide the popup after 2 seconds
                    navigate('/'); // Navigate to Dashboard
                }, 1000);
            }
        } catch (error) {
            setMessage('Error: Unable to reset password');
            console.error('Reset Password Error:', error);
            setShowPopup(true); // Show the popup
        }
    };

    return (
        <div className="forgot-container">
            {step === 1 ? (
                <>
                    <h2 className='forgot-header'>Forgot Password</h2>
                    <div className='forgot-box '>
                        <form onSubmit={handleSendVerificationCode}>
                            <div className="forgot-input-row">
                                <input className="forgot-input-field" type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>
                            <div className="reset-button-row">
                                <button type="submit" className='reset-button'>Send Verification Code</button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <h3>Enter Verification Code and Reset Password</h3>
                    <form onSubmit={handleResetPassword}>
                        <div className="forgot-input-row">
                            <input type="text" name="code" value={code} onChange={handleChange} className="forgot-input-field" placeholder="Enter verification code" required />
                        </div>
                        <div className="forgot-input-row">
                            <input type="password" name="password" value={password} onChange={handleChange} className="forgot-input-field" placeholder="Enter new password" required />
                        </div>
                        <div className="forgot-input-row">
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="forgot-input-field" placeholder="Re-enter new password" required />
                        </div>
                        <div className="reset-button-row">
                            <button type="submit" className="reset-button">Reset Password</button>
                        </div>
                    </form>

                </>
            )}
            {showPopup && ( // Display popup only if showPopup is true
                <div className="popup">
                    <div className="popup-content-big">
                        <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;