import React, { useState } from 'react';

import './cart.css'; 
import { useNavigate } from 'react-router-dom';
import Croissants from '../../Assets/assets/Croissants.jpg'
import Apple_Pie from '../../Assets/assets/Apple Pie.jpg'
import Sourdough_Bread from'../../Assets/assets/Sourdough Bread.jpg'

const Cart = () => {
    const navigate=useNavigate();
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Croissants',img:Croissants ,price: 30, quantity: 2 },
        { id: 2, name: 'Apple Pie',img:Apple_Pie, price: 32, quantity: 1 },
        { id: 3, name: 'Sourdough Bread',img:Sourdough_Bread, price: 30, quantity: 3 },
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return; 
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        
        alert('Proceeding to Checkout!');
        
        navigate('/checkout');
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td><img style={{width:"200px"}} src={item.img}/>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                        <button  onClick={handleCheckout} className="checkout-button">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;