

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User Info:', user); 
            alert('Google sign-in successful!');
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            alert('Google sign-in failed');
        }
    };

    return (
        <div className="login-container"> {/* Apply CSS class */}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            
          
            <div  className="google" style={{ margin: '20px 0', textAlign: 'center' }}>
                <button onClick={handleGoogleSignIn} style={{ padding: '10px', cursor: 'pointer' }} 
                ><FaGoogle/>
                    Sign in with Google
                </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Already have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;