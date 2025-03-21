import React, { useEffect, useState } from 'react';
import { Link } from "@remix-run/react";
import Header from '~/components/Header';
import { useCart } from '~/utils/cartUtils';
import { useWishlist } from '~/utils/wishlistUtils';
import ProductModal from '~/components/ProductModal';
import { useShop } from '~/context/ShopContext';
import LoadingIndicator from '~/components/LoadingIndicator';

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToCart, isInCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isCartLoading, isWishlistLoading } = useShop();
    const [recentlyAdded, setRecentlyAdded] = useState<{ [key: string]: boolean }>({});
    const [recentlyFavorited, setRecentlyFavorited] = useState<{ [key: string]: boolean }>({});

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

    const openProductModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setIsModalOpen(false);
    };

    const handleQuickAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation(); // Prevent opening the modal
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: product.color,
            size: product.size || 'M'
        }, 1, product.size || 'M');

        // Set recently added state for this product
        setRecentlyAdded(prev => ({ ...prev, [product.id]: true }));

        // Reset the state after animation completes
        setTimeout(() => {
            setRecentlyAdded(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation(); // Prevent opening the modal
        toggleWishlist(product);

        // Set animation state
        setRecentlyFavorited(prev => ({ ...prev, [product.id]: true }));

        // Clear animation state after delay
        setTimeout(() => {
            setRecentlyFavorited(prev => ({ ...prev, [product.id]: false }));
        }, 1000);
    };

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
        <div>
            <Header />
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
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">

                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-72 object-cover bg-gray-100 cursor-pointer"
                                    onClick={() => openProductModal(product)}
                                />
                                <button
                                    onClick={(e) => handleToggleWishlist(e, product)}
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
                                    aria-label={isInWishlist(product.id) ? "Remove from Favorites" : "Add to Favorites"}
                                    disabled={isWishlistLoading}
                                >
                                    {isWishlistLoading && recentlyFavorited[product.id] ? (
                                        <LoadingIndicator size="sm" color="#ef4444" />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                                            viewBox="0 0 24 24"
                                            strokeWidth={isInWishlist(product.id) ? 0 : 2}
                                            stroke="currentColor"
                                            className={`w-5 h-5 text-red-500 ${recentlyFavorited[product.id] ? 'animate-pulse' : ''}`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h3 className="text-lg font-bold mb-1 text-white">{product.name}</h3>
                                    <p className="text-lg font-bold text-white">${product.price}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-sm text-gray-500">{product.category || 'Uncategorized'}</p>
                                    <p className="text-sm text-gray-500">{product.color || 'N/A'}</p>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>

                                <div className="flex gap-2">
                                    <button
                                        className={`flex-1 ${recentlyAdded[product.id]
                                            ? "bg-green-500 hover:bg-green-600"
                                            : isInCart(product.id, product.size || 'M')
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-blue-500 hover:bg-blue-600"
                                            } text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-300 relative overflow-hidden`}
                                        onClick={(e) => handleQuickAddToCart(e, product)}
                                        disabled={isCartLoading && recentlyAdded[product.id]}
                                    >
                                        {isCartLoading && recentlyAdded[product.id] ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <LoadingIndicator size="sm" />
                                                <span>Adding...</span>
                                            </div>
                                        ) : (
                                            recentlyAdded[product.id]
                                                ? "Added!"
                                                : isInCart(product.id, product.size || 'M')
                                                    ? "In Cart"
                                                    : "Add to Cart"
                                        )}
                                    </button>
                                    <button
                                        className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded-md text-sm"
                                        onClick={() => openProductModal(product)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeProductModal}
                />
            )}
        </div>
    );
}
