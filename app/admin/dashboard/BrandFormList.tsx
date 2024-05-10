'use client'; // Ensures client-side rendering

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For HTTP requests
import Cookies from 'js-cookie'; // For managing cookies and retrieving the session ID


interface BrandForm {
    _id: string; // ID as a string
    brand_name: string;
    person_name: string;
    email: string;
    phone_number: string;
    city: string;
    social_media_presence: boolean; // Assuming this is a boolean
    brands_business_operations: string;
    brands_product_category: string;
    catalog_size: number;
    price_range: string;
    supply_chain: string;
    inventory: string;
    star_rating: number;
    feedback_text: string;
    website: string;
  }
  

  const BrandFormList: React.FC = () => {
    const [brandForms, setBrandForms] = useState<BrandForm[]>([]); // Type is a list of BrandForm
    const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookieSessionId = Cookies.get('session_id'); // Retrieve session ID from cookies

    const fetchBrandForms = async () => {
      try {
        // Include session ID as a query parameter in the GET request
        const response = await axios.get('http://localhost:8000/brandaccount/', {
          params: { session_id: cookieSessionId },
        });// Send a GET request to the backend
        setBrandForms(response.data); // Set the list of brand forms
        setIsLoading(false); // Set loading to false after data is retrieved
      } catch (err) {
        setError('Failed to fetch brand forms'); // Set error message in case of failure
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchBrandForms(); // Fetch the brand forms when the component is mounted
  }, []); // Empty dependency array to run only once on component mount

  if (isLoading) {
    return <p>Loading brand forms...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there is an error
  }

  return (
    <div>
      <h2>Brand Forms</h2>
      {brandForms.length === 0 ? (
        <p>No brand forms found.</p> // Display message if the list is empty
      ) : (
        <ul>
          {brandForms.map((brand) => (
            <li key={brand._id}>
              <strong>{brand.brand_name}</strong> - {brand.person_name} ({brand.email})
              {/* Add additional details or links as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandFormList; // Export the component for use in other parts of the application
