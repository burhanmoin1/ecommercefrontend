'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './BrandForm.css';


interface BrandFormTypes {
    brand_name: string;
    person_name: string;
    email: string;
    phone_number: string;
    city: string;
    social_media_presence: boolean;
    brands_business_operations: string;
    brands_product_category: string;
    catalog_size: string;
    brand_pictures: File[];  // This might be a file input
    price_range: string;
    supply_chain: string;
    inventory: string;
    star_rating: string;
    feedback_text: string;
    website: string;
}

const BrandForm: React.FC = () => {
    const [formData, setFormData] = useState<BrandFormTypes>({
        brand_name: '',
        person_name: '',
        email: '',
        phone_number: '',
        city: '',
        social_media_presence: false,
        brands_business_operations: '',
        brands_product_category: '',
        catalog_size: '',
        brand_pictures: [],  // Initialize as an empty array for file input
        price_range: '',
        supply_chain: '',
        inventory: '',
        star_rating: '',
        feedback_text: '',
        website: '',
    });

    const [formStatus, setFormStatus] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        const fieldValue = type === 'checkbox' ? checked : (type === 'file' ? Array.from(files || []) : value);
        setFormData({ ...formData, [name]: fieldValue });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'brand_pictures') {
                (formData[key] as File[]).forEach(file => formDataToSend.append(key, file));
            } else {
                formDataToSend.append(key, (formData as any)[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:8000/brandform/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('BrandAccount created:', response.data);
            setFormStatus('Form submitted successfully!');
        } catch (error) {
            console.error('Error creating BrandAccount:', error);
            setFormStatus('Error submitting form.');
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
                    <label>Brand Pictures:</label>
                    <input
                        type='file'
                        name='brand_pictures'
                        multiple
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
            {formStatus && <p>{formStatus}</p>}
        </div>
    );
};

export default BrandForm;
