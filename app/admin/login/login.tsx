'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.css';
import { useRouter } from 'next/navigation';

const LoginSuperuser = () => {
  // State management for form inputs and responses
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // For success/error messages
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior

    // Data to send in the POST request
    const data = {
        login, // Can be email or username
        password,
      };

    try {
      const response = await axios.post('http://localhost:8000/loginsuperuser/', data); // Change the endpoint as needed

      if (response.status === 200) {
        const session_id = response.data.session_id;
        Cookies.set('session_id', session_id, { expires: 7, secure: true });
        router.push('/admin/dashboard');
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
      <h2>Login Superuser</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Email or Username:</label> {/* Combined field */}
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Enter email or username"
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

export default LoginSuperuser;
