'use client';
import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import './BrandForm.css';  // Import CSS styles

const BrandForm = () => {
    // Set initial state for form fields
    const [formData, setFormData] = useState({
        brand_name: '',
        person_name: '',
        email: '',
        phone_number: '',
        city: '',
        social_media_presence: false,
        brands_business_operations: '',
        brands_product_category: '',
        catalog_size: '',
        brand_pictures: [],  // This might be a file input
        price_range: '',
        supply_chain: '',
        inventory: '',
        star_rating: '',
        feedback_text: '',
        website: '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle boolean values for checkbox inputs
        const fieldValue = (e.target.type === 'checkbox') ? e.target.checked : value;
        setFormData({ ...formData, [name]: fieldValue });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form behavior
        try {
            const response = await axios.post('http://localhost:8000/brandform/', formData);  // Adjust URL to your API endpoint
            console.log('BrandAccount created:', response.data);  // Log response data
        } catch (error) {
            console.error('Error creating BrandAccount:', error);  // Log any errors
        }
    };

    return (
        <div className='BrandForm'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brand Name:</label>
                    <input
                        type='text'
                        name='brand_name'
                        value={formData.brand_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Person Name:</label>
                    <input
                        type='text'
                        name='person_name'
                        value={formData.person_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type='text'
                        name='phone_number'
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type='text'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Social Media Presence:</label>
                    <input
                        type='checkbox'
                        name='social_media_presence'
                        checked={formData.social_media_presence}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Brands Business Operations:</label>
                    <input
                        type='text'
                        name='brands_business_operations'
                        value={formData.brands_business_operations}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Brands Product Category:</label>
                    <input
                        type='text'
                        name='brands_product_category'
                        value={formData.brands_product_category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Catalog Size:</label>
                    <input
                        type='number'
                        name='catalog_size'
                        value={formData.catalog_size}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price Range:</label>
                    <input
                        type='number'
                        name='price_range'
                        value={formData.price_range}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Supply Chain:</label>
                    <input
                        type='text'
                        name='supply_chain'
                        value={formData.supply_chain}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Inventory:</label>
                    <input
                        type='text'
                        name='inventory'
                        value={formData.inventory}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Star Rating:</label>
                    <input
                        type='number'
                        name='star_rating'
                        value={formData.star_rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Feedback Text:</label>
                    <input
                        type='text'
                        name='feedback_text'
                        value={formData.feedback_text}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Website:</label>
                    <input
                        type='url'
                        name='website'
                        value={formData.website}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BrandForm;
