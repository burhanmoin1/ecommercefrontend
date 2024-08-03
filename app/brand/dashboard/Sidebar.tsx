'use client';
import './dashboard.css';
import React, {useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for client-side navigation
import Cookies from 'js-cookie'; // For working with cookies

const Sidebar = () => {

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

  const handleProductsButtonClick = () => {
    const homecontent = document.querySelector('.maincontent') as HTMLElement;
    const productscontent = document.querySelector('.productcontent') as HTMLElement;
        if (homecontent) {
          homecontent.style.display = 'none';
        }
        if (productscontent) {
          productscontent.style.display = 'block';
        };
  };
  return (
    <div className="h-screen fixed bg-navy flex flex-col text-white m-0 shadow-md w-1/5 text-center z-10">
      <h2 className='dashboardheading'>Dashboard</h2>
      <a className='sidebarlinks' onClick={handleProductsButtonClick}>Products</a>
      <button className='logout' onClick={handleDeleteCookie}>Log Out</button> {/* Button to delete the session_id cookie */}

    </div>
  );
};

export default Sidebar;