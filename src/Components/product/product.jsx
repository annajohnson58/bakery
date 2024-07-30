
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css'; 
import Croissants from '../../Assets/assets/Croissants.jpg';
import Sourdough_Bread from '../../Assets/assets/Sourdough Bread.jpg';
import Apple_Pie from '../../Assets/assets/Apple Pie.jpg';

const ProductPage = () => {
    const navigate = useNavigate();

    const products = [
        { id: 1, name: 'Croissants', price: 30, img: Croissants },
        { id: 2, name: 'Apple Pie', price: 32, img: Apple_Pie },
        { id: 3, name: 'Sourdough Bread', price: 30, img: Sourdough_Bread },
    ];

    const handleProductClick = (id) => {
        navigate(`/productdetails/${id}`); 
    };

    return (
        <div className="product-page">
            <h1>Our Bakery Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
                        <img src={product.img} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;