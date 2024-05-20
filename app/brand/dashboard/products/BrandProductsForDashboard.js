'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandProductsForDashboard = () => {
    const [primaryCategories, setPrimaryCategories] = useState([]); 
    const [secondaryCategories, setSecondaryCategories] = useState([]);// State to store primary categories
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: '',
        primary_category: '',
        secondary_category: '',
        brand_name: localStorage.getItem('brand_id'), // Use brand_id from local storage
        price: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const brandId = localStorage.getItem('brand_id'); // Use brand_id from local storage
                const response = await axios.get(`http://localhost:8000/brandproductsfordashboard/${brandId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchPrimaryCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/addprimarycategory/');
                setPrimaryCategories(response.data);
            } catch (error) {
                console.error('Error fetching primary categories:', error);
            }
        };
    
        fetchPrimaryCategories(); // Invoke inside useEffect
    
    }, []);    

    const handlePrimaryChange = async (e) => {
        const primaryCategoryName = e.target.value;
        setFormData({ ...formData, primary_category: primaryCategoryName });

        try {
            const response = await axios.get('http://localhost:8000/get_secondary_categories/', {
                params: {
                    primary_category_name: primaryCategoryName
                }
            });
            setSecondaryCategories(response.data.secondary_categories);
        } catch (error) {
            console.error('Error fetching secondary categories:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('form data', formData)
            await axios.post('http://localhost:8000/brandproductsfordashboard/', formData);
            // After successfully posting a new product, fetch the updated product list
            const brandId = localStorage.getItem('brand_id'); // Use brand_id from local storage
            const response = await axios.get(`http://localhost:8000/brandproductsfordashboard/${brandId}`);
            setProducts(response.data);
            // Clear form data
            setFormData({
                name: '',
                description: '',
                sku: '',
                primary_category: '',
                secondary_category: '',
                brand_name: localStorage.getItem('brand_id'), // Use brand_id from local storage
                price: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='headerandmain'>
            <div className='header'>
                <h2 className='headerheading'>search</h2>
            </div>
            <div className='maincontent'>
                <h1>Products for Dashboard</h1>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <p>Name: {product.name}</p>
                            <p>Description: {product.description}</p>
                            <p>SKU: {product.sku}</p>
                            <p>Primary Category: {product.primary_category}</p>
                            <p>Secondary Category: {product.secondary_category}</p>
                            <p>Brand Name: {product.brand_name}</p>
                            <p>Price: {product.price}</p>
                        </li>
                    ))}
                </ul>
                <h2>Add New Product</h2>
                <form className='productform' onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    
                    <label>SKU:</label>
                    <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
                    
                    
                    <label>Primary Category:</label>
                    <select name="primary_category" value={formData.primary_category} onChange={handlePrimaryChange} required>
                        <option value="">Select Primary Category</option>
                        {primaryCategories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    
                    <label>Secondary Category:</label>
                    <select name="secondary_category" value={formData.secondary_category} onChange={handleChange} required>
                        <option value="">Select Secondary Category</option>
                        {secondaryCategories.map(category => (
                            <option key={category.id} value={category.name}>{category.name} - {category.description}</option>
                        ))}
                    </select>

                    <input type="hidden" name="brand_id" value={localStorage.getItem('brand_id')} /> {/* Change to brand_id */}
                    
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BrandProductsForDashboard;


