'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddPrimaryCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/addprimarycategory/', { name, description });
            if (response.status === 201) {
                setSuccess('Primary category added successfully');
            }
        } catch (error) {
            setError('Failed to add primary category');
        }
    };

    return (
        <div>
            <h2>Add Primary Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddPrimaryCategory;
