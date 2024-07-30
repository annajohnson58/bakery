import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './checkout.css'; // Make sure to include your CSS file

// Load your publishable key from Stripe
const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const Checkout = () => {
    const navigate = useNavigate();
    const cartItems = [
        { id: 1, name: 'Croissants', price: 30, quantity: 2 },
        { id: 2, name: 'Apple Pie', price: 32, quantity: 1 },
        { id: 3, name: 'Sourdough Bread', price: 30, quantity: 3 },
    ];
    
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
    });
    
    const [paymentError, setPaymentError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (error) {
            setPaymentError(error.message);
            return;
        }
    
        // Send payment method and shipping info to backend
        const orderAmount = calculateTotal() * 100; // Convert to cents
    
        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: orderAmount,
                    shippingInfo: shippingInfo,
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                alert('Thank you for your order!');
                navigate('/'); // Navigate back to home or product page after checkout
            } else {
                alert(`Payment failed: ${data.error}`);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while processing your payment.');
        }
    };
    

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                {/* Separate Section for Shipping Information */}
                <section className="shipping-info-section">
                    <h2>Shipping Information</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={shippingInfo.name}
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
                            value={shippingInfo.address}
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
                            value={shippingInfo.city}
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
                            value={shippingInfo.state}
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
                            value={shippingInfo.zip}
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
                            value={shippingInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </section>
                
                {/* Order Summary Section */}
                <section className="order-summary-section">
                    <h2>Order Summary</h2>
                    <ul className="order-summary">
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                </section>

                {/* Payment Information Section */}
                <h2>Payment Information</h2>
                <CardElement />
                {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
                
                <button type="submit" className="checkout-button" disabled={!stripe}>Place Order</button>
            </form>
        </div>
    );
};

// Wrap the Checkout component with Elements provider
const CheckoutWithStripe = () => (
    <Elements stripe={stripePromise}>
        <Checkout />
    </Elements>
);

export default CheckoutWithStripe;