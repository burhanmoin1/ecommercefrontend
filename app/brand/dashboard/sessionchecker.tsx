'use client'; // Ensures client-side rendering

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for client-side navigation
import Cookies from 'js-cookie'; // For working with cookies
import axios from 'axios'; // For making HTTP requests

const SessionChecker = ({ children }) => { // Receive children to render if authenticated
  const router = useRouter(); // Instantiate the Next.js router
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to track authentication
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const cookieSessionId = Cookies.get('session_id'); // Get the session ID from the cookie

    if (cookieSessionId) {
      // POST request to backend to validate the session ID
      axios
        .post('http://localhost:8000/brandaccountsessionchecker/', { session_id: cookieSessionId })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true); // If successful, set authenticated state
          } else {
            setIsAuthenticated(false); // Set to false if not authenticated
            setErrorMessage('Session not authenticated');
          }
        })
        .catch((error) => {
          // Handle errors from the backend
          setIsAuthenticated(false); // Assume not authenticated
          setErrorMessage(error.response?.data?.error || 'An error occurred while checking the session.');
        });
    } else {
      setIsAuthenticated(false); // No session ID in cookie
      setErrorMessage('Please log in.');
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/brand/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]); // Redirect if authentication fails

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Display loading message while checking authentication
  }

  return (
    <div>
      {isAuthenticated === true ? (
        children // Render the protected content only if authenticated
      ) : (
        <p>{errorMessage || 'Session not authenticated. Redirecting to login...'}</p> // Error message if not authenticated
      )}
    </div>
  );
};

export default SessionChecker;
