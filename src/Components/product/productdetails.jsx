
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './productdetails.css';
import Croissants from '../../Assets/assets/Croissants.jpg';
import Sourdough_Bread from '../../Assets/assets/Sourdough Bread.jpg';
import Apple_Pie from '../../Assets/assets/Apple Pie.jpg';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate=useNavigate();

    
    const products = [
        {
            id: 1,
            name: 'Croissants',
            price: 30,
            description: 'Delicious buttery croissants made fresh every day.',
            img: Croissants,
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Apple Pie',
            price: 32,
            description: 'Classic apple pie with a flaky crust and sweet filling.',
            img: Apple_Pie,
            rating: 4.8,
        },
        {
            id: 3,
            name: 'Sourdough Bread',
            price: 30,
            description: 'Freshly baked sourdough bread with a crispy crust.',
            img: Sourdough_Bread,
            rating: 4.6,
        },
    ];

    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

   
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.img} alt={product.name} />
            <p>{product.description}</p>
            <h2>Price: ${product.price}</h2>
            <div className="rating">
                <h3>Rating: {renderStars(product.rating)}</h3>
            </div>
            <button className="add-to-cart-button" onClick={()=>navigate('/cart')}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;