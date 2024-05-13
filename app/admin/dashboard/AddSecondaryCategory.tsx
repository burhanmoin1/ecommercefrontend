'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
    id: string;
    name: string;
    // Add any other properties if available
}

const AddSecondaryCategory: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [parentCategories, setParentCategories] = useState<Category[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch parent categories from the API
        const fetchParentCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/addprimarycategory/');
                setParentCategories(response.data);
            } catch (error) {
                setError('Failed to fetch parent categories');
            }
        };

        fetchParentCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/addsecondarycategory/', { name, description, parent_category_id: parentId });
            if (response.status === 201) {
                setSuccess('Secondary category added successfully');
            }
        } catch (error) {
            setError('Failed to add secondary category');
        }
    };

    return (
        <div>
            <h2>Add Secondary Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <select value={parentId} onChange={(e) => {
                        setParentId(e.target.value);
                        console.log("Selected Parent ID:", e.target.value); // Log the selected parent ID
                    }}>
                    <option value="">Select Parent Category</option>
                    {parentCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddSecondaryCategory;
