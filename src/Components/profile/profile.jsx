

import React, { useState } from 'react';
import './profile.css'; 

const Profile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Bakery Lane',
        city: 'Baker City',
        state: 'CA',
        zip: '12345',
    });

    const [isEditing, setIsEditing] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated User Info:', user);
        setIsEditing(false); 
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code:</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={user.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="profile-button">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </form>
            ) : (
                <div className="profile-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>State:</strong> {user.state}</p>
                    <p><strong>Zip Code:</strong> {user.zip}</p>
                    <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;