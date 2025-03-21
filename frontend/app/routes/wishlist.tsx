import { useState } from 'react';
import { Link } from '@remix-run/react';
import Header from '~/components/Header';
import { useCart } from '~/utils/cartUtils';
import { useWishlist } from '~/utils/wishlistUtils';
import { useShop } from '~/context/ShopContext';
import LoadingIndicator from '~/components/LoadingIndicator';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();
    const { isCartLoading, isWishlistLoading } = useShop();
    const [message, setMessage] = useState("");
    const [recentlyAdded, setRecentlyAdded] = useState<{ [key: string]: boolean }>({});

    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            color: item.color,
            size: item.size || "M"
        }, 1, item.size || "M");

        // Set recently added state for this product
        setRecentlyAdded(prev => ({ ...prev, [item.id]: true }));

        // Show message
        setMessage(`${item.name} added to cart!`);

        // Clear message and animation after delay
        setTimeout(() => {
            setMessage("");
            setRecentlyAdded(prev => ({ ...prev, [item.id]: false }));
        }, 3000);
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-gray-600 mb-6">Your wishlist is empty</p>

                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

                {message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 transition-opacity duration-300">
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-64 object-cover"
                                />
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                    disabled={isWishlistLoading}
                                >
                                    {isWishlistLoading ? (
                                        <LoadingIndicator size="sm" color="#ef4444" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                                <p className="text-lg font-bold text-red-600 mb-2">${item.price}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className={`${recentlyAdded[item.id] || isInCart(item.id, item.size || "M")
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-blue-500 hover:bg-blue-600"
                                            } text-white px-4 py-2 rounded transition-all duration-300 relative overflow-hidden`}
                                        disabled={isCartLoading && recentlyAdded[item.id]}
                                    >
                                        {isCartLoading && recentlyAdded[item.id] ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <LoadingIndicator size="sm" />
                                                <span>Adding...</span>
                                            </div>
                                        ) : (
                                            recentlyAdded[item.id]
                                                ? "Added!"
                                                : isInCart(item.id, item.size || "M")
                                                    ? "In Cart"
                                                    : "Add to Cart"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={clearWishlist}
                        className="text-red-500 hover:text-red-700"
                        disabled={isWishlistLoading}
                    >
                        {isWishlistLoading ? (
                            <div className="flex items-center gap-2">
                                <LoadingIndicator size="sm" color="#ef4444" />
                                <span>Clearing...</span>
                            </div>
                        ) : (
                            "Clear Wishlist"
                        )}
                    </button>
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
