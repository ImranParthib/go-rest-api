import { useState } from 'react';
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useCart } from '~/utils/cartUtils';
import Header from '~/components/Header';

export default function Cart() {
    const { cart, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    // Form state for checkout
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real application, you would:
        // 1. Validate the form data
        // 2. Process the payment
        // 3. Create an order in the database

        // Simulate processing
        setTimeout(() => {
            clearCart();
            setCheckoutComplete(true);
        }, 1500);
    };

    if (checkoutComplete) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="mb-6 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold mb-4">Order Complete!</h1>
                        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received.</p>

                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-gray-600 mb-6">Your cart is empty</p>

                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                            Start Shopping
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
                <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="md:w-8/12">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Product</th>
                                        <th className="py-3 px-4 text-left">Size</th>
                                        <th className="py-3 px-4 text-center">Quantity</th>
                                        <th className="py-3 px-4 text-right">Price</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={`${item.id}-${item.size}`} className="border-t">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded mr-4"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.color}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">{item.size}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        className="h-8 w-8 bg-gray-100 rounded-l flex items-center justify-center"
                                                        onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="h-8 w-12 text-center border-t border-b"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)}
                                                    />
                                                    <button
                                                        className="h-8 w-8 bg-gray-100 rounded-r flex items-center justify-center"
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">${item.price * item.quantity}</td>
                                            <td className="py-4 px-4 text-right">
                                                <button
                                                    onClick={() => removeItem(item.id, item.size)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => clearCart()}
                                className="text-red-500 hover:text-red-700"
                            >
                                Clear Cart
                            </button>

                            <Link to="/" className="text-blue-500 hover:text-blue-700">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:w-4/12">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${cartTotal}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal}</span>
                                </div>
                            </div>

                            {!isCheckingOut ? (
                                <button
                                    onClick={() => setIsCheckingOut(true)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                                >
                                    Proceed to Checkout
                                </button>
                            ) : (
                                <form onSubmit={handleCheckout}>
                                    <h3 className="text-lg font-bold mb-2">Shipping Information</h3>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Zip Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 mt-4">Payment Information</h3>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">CVC</label>
                                            <input
                                                type="text"
                                                name="cardCVC"
                                                value={formData.cardCVC}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsCheckingOut(false)}
                                            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                                        >
                                            Complete Order
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
