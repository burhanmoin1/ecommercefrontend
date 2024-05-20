'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.css';
import { useRouter } from 'next/navigation';

const BrandAccountLogin = () => {
  // State management for form inputs and responses
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // For success/error messages
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior

    // Data to send in the POST request
    const data = {
        email, // Can be email or username
        password,
      };

    try {
      const response = await axios.post('http://localhost:8000/BrandAccountLogin/', data); // Change the endpoint as needed

      if (response.status === 200) {
        const session_id = response.data.session_id;
        const brand_name = response.data.brand_account.brand_name;
        const brand_id = response.data.brand_account.id;
        console.log('Brand ID:', brand_id);
        localStorage.setItem('brand_id', brand_id);
        Cookies.set('session_id', session_id, { expires: 1, secure: true });
        console.log('Brand Name:', brand_name);
        localStorage.setItem('brand_name', brand_name);

        router.push('/brand/dashboard');
        setResponseMessage('Login successful'); // Set success message
      } else {
        // Handle unexpected status
        setResponseMessage('An error occurred during login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error handling
        if (err.response) {
          setResponseMessage(err.response.data.error || 'An error occurred'); // Error message from backend
        } else {
          setResponseMessage('An unexpected error occurred during login');
        }
      } else {
        setResponseMessage('An unknown error occurred'); // Non-Axios error
      }
    }
  };

  return (
    <div className="addsuperuser">
      <h2>Login Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label> {/* Combined field */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>} {/* Display success/error messages */}
    </div>
  );
};

export default BrandAccountLogin;
