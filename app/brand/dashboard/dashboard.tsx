'use client';
import './dashboard.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for client-side navigation
import Cookies from 'js-cookie'; // For working with cookies

const Dashboard = () => {

  const router = useRouter(); // Instantiate the Next.js router
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to track authentication
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleDeleteCookie = () => {
    // Delete the session_id cookie
    Cookies.remove('session_id', { secure: true }); // Secure flag to ensure correct deletion
    setIsAuthenticated(false); // Mark as not authenticated
    setErrorMessage('Session ID deleted. You are logged out.'); // Message indicating session deletion
    router.push('/brand/login'); // Redirect to login page
  };
  return (
    <div className='dashboard'>
      <h2 className='dashboard-heading'>dashboard</h2>
      <div>
          <p>Session authenticated. Welcome back!</p>
          <button onClick={handleDeleteCookie}>Log Out</button> {/* Button to delete the session_id cookie */}
        </div>
    </div>
  );
};

export default Dashboard;