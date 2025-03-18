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

const API_URL = 'http://localhost:8080/api/products';

// Product category options
const CATEGORIES = ['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories', 'Footwear', 'Activewear'];

// Size options
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', 'One Size'];

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        image: '',
        description: '',
        category: 'Tops',
        size: 'M',
        color: ''
    });

    // Fetch all products
    const fetchProducts = () => {
        setLoading(true);
        fetch(API_URL)
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
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' ? parseInt(value, 10) || 0 : value
        });
    };

    // Clear form and messages
    const resetForm = () => {
        setFormData({
            name: '',
            price: 0,
            image: '',
            description: '',
            category: 'Tops',
            size: 'M',
            color: ''
        });
        setEditingProduct(null);
        setError('');
        setSuccess('');
    };

    // Open form for creating a new product
    const handleAddNew = () => {
        resetForm();
        setShowForm(true);
    };

    // Open form for editing a product
    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category || 'Tops',
            size: product.size || 'M',
            color: product.color || ''
        });
        setEditingProduct(product);
        setShowForm(true);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.name || formData.price <= 0 || !formData.image || !formData.description || !formData.color) {
            setError('Please fill all fields with valid values');
            return;
        }

        const isEditing = !!editingProduct;
        const url = isEditing ? `${API_URL}/${editingProduct.id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save product');
                }
                return response.json();
            })
            .then(() => {
                setSuccess(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
                fetchProducts();
                resetForm();
                setShowForm(false);
            })
            .catch(err => {
                setError('Error: ' + err.message);
            });
    };

    // Delete a product
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete product');
                    }
                    return response.json();
                })
                .then(() => {
                    setSuccess('Product deleted successfully!');
                    fetchProducts();
                })
                .catch(err => {
                    setError('Error: ' + err.message);
                });
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex justify-center items-center p-10">
                    <p className="text-lg">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-6">
                <Link to="/" className="inline-block px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">
                    ← Back to Shop
                </Link>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Clothing Store Administration</h1>
                <button
                    className="btn btn-primary"
                    onClick={handleAddNew}
                >
                    Add New Product
                </button>
            </div>

            {error && <p className="text-red-600 my-4">{error}</p>}
            {success && <p className="text-green-600 my-4">{success}</p>}

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button
                            className="text-2xl border-none bg-transparent"
                            onClick={() => setShowForm(false)}
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="name">Product Name:</label>
                            <input
                                id="name"
                                className="w-full p-2 border rounded"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="category">Category:</label>
                            <select
                                id="category"
                                className="w-full p-2 border rounded"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="size">Size:</label>
                            <select
                                id="size"
                                className="w-full p-2 border rounded"
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                            >
                                {SIZES.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="color">Color:</label>
                            <input
                                id="color"
                                className="w-full p-2 border rounded"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                placeholder="Enter color (e.g., Blue, Red, Black)"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="price">Price ($):</label>
                            <input
                                id="price"
                                className="w-full p-2 border rounded"
                                type="number"
                                name="price"
                                value={formData.price.toString()}
                                onChange={handleInputChange}
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="image">Image URL:</label>
                            <input
                                id="image"
                                className="w-full p-2 border rounded"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                            />
                            {formData.image && (
                                <img
                                    className="mt-2 max-w-[100px] max-h-[100px]"
                                    src={formData.image}
                                    alt="Product preview"
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                className="w-full p-2 border rounded"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                rows={4}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Size</th>
                            <th className="p-3 text-left">Color</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <img
                                        className="w-20 h-20 object-cover rounded"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.category || 'N/A'}</td>
                                <td className="p-3">{product.size || 'N/A'}</td>
                                <td className="p-3">{product.color || 'N/A'}</td>
                                <td className="p-3">${product.price}</td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-secondary text-sm px-2 py-1"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger text-sm px-2 py-1"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
