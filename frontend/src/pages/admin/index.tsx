import React, { useEffect, useState } from 'react';
import { View, Text, Image, Input, Button, Textarea } from 'remax/one';
import './index.css';
import { navigate } from 'remax/one';

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
const CATEGORIES = ['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories', 'Footwear'];

// Size options
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40'];

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
    const handleInputChange = (e: any) => {
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

    // Go back to homepage
    const goToHomepage = () => {
        navigate('/pages/index/index');
    };

    if (loading && products.length === 0) {
        return (
            <View className="admin-container">
                <View className="loading">
                    <Text>Loading products...</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="admin-container">
            <View className="nav-buttons">
                <Text className="nav-link" onClick={goToHomepage}>← Back to Shop</Text>
            </View>

            <View className="admin-header">
                <Text className="admin-title">Clothing Store Administration</Text>
                <Button className="admin-button" onClick={handleAddNew}>Add New Product</Button>
            </View>

            {error && <Text className="error-message">{error}</Text>}
            {success && <Text className="success-message">{success}</Text>}

            {showForm && (
                <View className="admin-form">
                    <View className="modal-header">
                        <Text className="modal-title">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </Text>
                        <Button className="close-button" onClick={() => setShowForm(false)}>×</Button>
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Product Name:</Text>
                        <Input
                            className="form-input"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                        />
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Category:</Text>
                        <select
                            className="form-input"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Size:</Text>
                        <select
                            className="form-input"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                        >
                            {SIZES.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Color:</Text>
                        <Input
                            className="form-input"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            placeholder="Enter color (e.g., Blue, Red, Black)"
                        />
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Price ($):</Text>
                        <Input
                            className="form-input"
                            type="number"
                            name="price"
                            value={formData.price.toString()}
                            onChange={handleInputChange}
                            placeholder="Enter price"
                        />
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Image URL:</Text>
                        <Input
                            className="form-input"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Enter image URL"
                        />
                        {formData.image && (
                            <Image className="preview-image" src={formData.image} mode="aspectFit" />
                        )}
                    </View>

                    <View className="form-group">
                        <Text className="form-label">Description:</Text>
                        <Textarea
                            className="form-input"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                            rows={4}
                        />
                    </View>

                    <View className="form-actions">
                        <Button className="admin-button secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button className="admin-button" onClick={handleSubmit}>Save</Button>
                    </View>
                </View>
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <Image className="thumbnail" src={product.image} mode="aspectFit" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category || 'N/A'}</td>
                            <td>{product.size || 'N/A'}</td>
                            <td>{product.color || 'N/A'}</td>
                            <td>${product.price}</td>
                            <td>
                                <View className="admin-action-buttons">
                                    <Button className="admin-button secondary" onClick={() => handleEdit(product)}>Edit</Button>
                                    <Button className="admin-button delete" onClick={() => handleDelete(product.id)}>Delete</Button>
                                </View>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </View>
    );
}
