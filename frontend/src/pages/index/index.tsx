import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'remax/one';
import './index.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export default function IndexPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                <Text className="title">Products Catalog</Text>
            </View>
            <View className="products-grid">
                {products.map(product => (
                    <View key={product.id} className="product-card">
                        <Image className="product-image" src={product.image} mode="aspectFit" />
                        <View className="product-info">
                            <Text className="product-name">{product.name}</Text>
                            <Text className="product-price">${product.price}</Text>
                            <Text className="product-description">{product.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
