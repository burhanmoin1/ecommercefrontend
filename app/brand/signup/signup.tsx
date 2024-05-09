'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './signup.css';

const AddBrandAccount = () => {
  // State for form input and response message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Updated type

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    const data = {
      email,
      password,
    };

    try {
      // Send a POST request to the Django endpoint with Axios
      const response = await axios.post('http://localhost:8000/addbrandaccount/', data);

      if (response.status === 201) {
        setResponseMessage('Brand account created successfully, ask admin to confirm identity for access.');
      } else {
        setResponseMessage(response.data.error || 'An error occurred');
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Error handling for Axios errors
          if (error.response) {
            setResponseMessage(error.response.data.error || 'An error occurred');
          } else {
            setResponseMessage('An error occurred while creating the brand account.');
          }
        } else {
          // Non-Axios error handling
          setResponseMessage('An unexpected error occurred.');
        }
      }
    };

  return (
    <div className='addsuperuser'>
      <h2>Create Brand Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Create Brand Account</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>} {/* Display response message */}
    </div>
  );
};

export default AddBrandAccount;
