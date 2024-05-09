'use client'; // Ensures client-side rendering

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for client-side navigation
import Cookies from 'js-cookie'; // For working with cookies
import axios from 'axios'; // For making HTTP requests

const SessionChecker = () => {
  const router = useRouter(); // Instantiate the Next.js router
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to track authentication
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handleDeleteCookie = () => {
    // Delete the session_id cookie
    Cookies.remove('session_id', { secure: true }); // Secure flag to ensure correct deletion
    setIsAuthenticated(false); // Mark as not authenticated
    setErrorMessage('Session ID deleted. You are logged out.'); // Message indicating session deletion
    router.push('/admin/login'); // Redirect to login page
  };

  useLayoutEffect(() => {
    const cookieSessionId = Cookies.get('session_id'); // Get the session ID from the cookie

    if (cookieSessionId) {
      axios
        .post('http://localhost:8000/adminsessionchecker/', { session_id: cookieSessionId }) // Check session ID
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true); // If successful, set authenticated state
          } else {
            setIsAuthenticated(false); // Set to false if not authenticated
            setErrorMessage('Session not authenticated'); // Set error message
          }
        })
        .catch((error) => {
          // Handle errors from the backend
          setIsAuthenticated(false); // Assume not authenticated
          setErrorMessage(error.response?.data?.error || 'An error occurred while checking the session.');
        });
    } else {
      setIsAuthenticated(false); // No session ID in cookie
      setErrorMessage('No session ID found.');
    }
  }, []); // Run only once when the component mounts

  useLayoutEffect(() => {
    if (isAuthenticated === false) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      {isAuthenticated === true && (
        <div>
          <p>Session authenticated. Welcome back!</p>
          <button onClick={handleDeleteCookie}>Log Out</button> {/* Button to delete the session_id cookie */}
        </div>
      )}
      {isAuthenticated === false && (
        <div>
          <p>{errorMessage || 'Session not authenticated. Redirecting to login...'}</p> {/* Message while redirecting */}
        </div>
      )}
    </div>
  );
};

export default SessionChecker;
