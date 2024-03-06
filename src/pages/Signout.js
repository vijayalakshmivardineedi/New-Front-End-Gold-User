import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signout } from '../actions/auth.action';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await axios.post('http://localhost:2000/signout');
      if (response.status === 200) {
        setConfirmation(true);
      }
    } catch (error) {
      console.error('Confirmation failed:', error);
    }
  };

  const performSignout = async () => {
    try {
      await dispatch(signout());
      localStorage.removeItem('authToken');
      
      // Redirect to the home page (replace '/home' with your home page route)
      navigate('/home'); // Use navigate for redirection
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Sign Out</button>
      {confirmation && (
        <div>
          <p>Are you sure you want to sign out?</p>
          <button onClick={performSignout}>Yes</button>
          <button onClick={() => setConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Signout;
