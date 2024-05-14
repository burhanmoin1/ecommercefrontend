'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandProductsForDashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: '',
        primary_category: '',
        secondary_category: '',
        brand_name: localStorage.getItem('brand_name'),
        price: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const brandName = localStorage.getItem('brand_name');
                const response = await axios.get(`http://localhost:8000/brandproductsfordashboard/${brandName}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/brandproductsfordashboard', formData);
            // After successfully posting a new product, fetch the updated product list
            const brandName = localStorage.getItem('brand_name');
            const response = await axios.get(`http://localhost:8000/brandproductsfordashboard/${brandName}`);
            setProducts(response.data);
            // Clear form data
            setFormData({
                name: '',
                description: '',
                sku: '',
                primary_category: '',
                secondary_category: '',
                brand_name: localStorage.getItem('brand_name'),
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
                    <input type="text" name="primary_category" value={formData.primary_category} onChange={handleChange} required />
                    
                    <label>Secondary Category:</label>
                    <input type="text" name="secondary_category" value={formData.secondary_category} onChange={handleChange} required />
                    
                    {/* Assuming brand_name is stored in localStorage */}
                    <input type="hidden" name="brand_name" value={localStorage.getItem('brand_name')} />
                    
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BrandProductsForDashboard;

