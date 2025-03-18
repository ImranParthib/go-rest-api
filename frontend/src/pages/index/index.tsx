import React, { useEffect, useState } from 'react';
import { View, Text, Image, Navigator } from 'remax/one';
import './index.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    size: string;
    color: string;
}

export default function IndexPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch products: ' + err.message);
                setLoading(false);
            });
    }, []);

    // Get unique categories
    const categories = ['All', ...new Set(products.map(product => product.category).filter(Boolean))];

    // Filter products by category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (loading) {
        return (
            <View className="loading">
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="error">
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View className="container">
            <View className="header">
                <Text className="title">Clothing Shop</Text>
                <Navigator url="/pages/admin/index" className="admin-link">Admin Panel</Navigator>
            </View>

            <View className="category-filter">
                {categories.map(category => (
                    <Text
                        key={category}
                        className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Text>
                ))}
            </View>

            <View className="products-grid">
                {filteredProducts.map(product => (
                    <View key={product.id} className="product-card">
                        <Image className="product-image" src={product.image} mode="aspectFit" />
                        <View className="product-info">
                            <Text className="product-name">{product.name}</Text>
                            <Text className="product-category">{product.category || 'Uncategorized'}</Text>
                            <View className="product-details">
                                <Text className="product-color">{product.color || 'N/A'}</Text>
                                <Text className="product-size">Size: {product.size || 'N/A'}</Text>
                            </View>
                            <Text className="product-price">${product.price}</Text>
                            <Text className="product-description">{product.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
