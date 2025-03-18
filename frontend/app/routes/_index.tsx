import React, { useEffect, useState } from 'react';
import { Link } from "@remix-run/react";

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
            <div className="flex justify-center items-center p-10">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-10">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col items-center mb-8 gap-3">
                <h1 className="text-3xl font-bold text-center">Clothing Shop</h1>
                <Link to="/admin" className="text-blue-500 underline text-sm">Admin Panel</Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full text-sm ${selectedCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:translate-y-[-4px] transition-transform">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-72 object-cover bg-gray-100"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.category || 'Uncategorized'}</p>
                            <div className="flex justify-between mb-2">
                                <p className="text-sm text-gray-500">{product.color || 'N/A'}</p>
                                <p className="text-sm text-gray-500">Size: {product.size || 'N/A'}</p>
                            </div>
                            <p className="text-lg font-bold text-red-600 mb-2">${product.price}</p>
                            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
