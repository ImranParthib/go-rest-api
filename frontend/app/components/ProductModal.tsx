import React from 'react';
import { useCart } from '~/utils/cartUtils';
import { useWishlist } from '~/utils/wishlistUtils';
import { useToast } from '~/context/ToastContext';

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

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart, isInCart, getCartItem } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { showToast } = useToast();
    const [selectedSize, setSelectedSize] = React.useState(product.size || "M");
    const [quantity, setQuantity] = React.useState(1);
    const [isAddedToCart, setIsAddedToCart] = React.useState(false);
    const [isAddingToCart, setIsAddingToCart] = React.useState(false);

    React.useEffect(() => {
        // Check if the item is already in the cart with the selected size
        setIsAddedToCart(isInCart(product.id, selectedSize));
    }, [product.id, selectedSize, isInCart]);

    // Available sizes based on the product category
    const availableSizes = product.category === "Footwear"
        ? ["38", "39", "40", "41", "42", "43", "44"]
        : ["XS", "S", "M", "L", "XL", "XXL"];

    const handleAddToCart = () => {
        setIsAddingToCart(true);

        if (isInCart(product.id, selectedSize)) {
            const existingItem = getCartItem(product.id, selectedSize);
            const currentQty = existingItem ? existingItem.quantity : 0;

            showToast(
                `${product.name} (Size: ${selectedSize}) already in cart with quantity ${currentQty}. Quantity increased to ${currentQty + quantity}.`,
                'info'
            );
        }

        const result = addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: product.color,
            size: selectedSize
        }, quantity, selectedSize);

        setIsAddedToCart(true);

        if (result.isNewItem) {
            showToast(`${product.name} added to cart!`, 'success');
        } else {
            showToast(`Updated ${product.name} quantity to ${result.updatedQuantity}!`, 'success');
        }

        // Reset adding state after animation
        setTimeout(() => {
            setIsAddingToCart(false);
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between p-2">
                    <button
                        onClick={() => toggleWishlist(product)}
                        className="p-1 rounded-full hover:bg-gray-200 flex items-center gap-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={isInWishlist(product.id) ? 0 : 1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className={`text-sm ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'}`}>
                            {isInWishlist(product.id) ? 'Saved' : 'Add to Wishlist'}
                        </span>
                    </button>

                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="md:flex p-6">
                    {/* Product Image */}
                    <div className="md:w-1/2 relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[300px] md:h-[400px] object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 p-4 md:p-6">
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">{product.category}</span>
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="text-xl font-bold text-red-600 mt-2">${product.price}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-medium mb-2">Color: <span className="text-gray-700">{product.color}</span></p>

                            <div className="mb-4">
                                <p className="font-medium mb-2">Size:</p>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map(size => (
                                        <button
                                            key={size}
                                            className={`
                                                h-10 w-10 flex items-center justify-center rounded-md 
                                                ${selectedSize === size
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }
                                                ${isInCart(product.id, size)
                                                    ? 'ring-2 ring-green-500'
                                                    : ''}
                                            `}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                            {isInCart(product.id, size) && (
                                                <span className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="font-medium mb-2">Quantity:</p>
                                <div className="flex items-center">
                                    <button
                                        className="h-8 w-8 bg-gray-100 rounded-l flex items-center justify-center"
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="h-8 w-16 text-center border-t border-b"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <button
                                        className="h-8 w-8 bg-gray-100 rounded-r flex items-center justify-center"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                className={`w-full ${isAddedToCart
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-blue-500 hover:bg-blue-600"} 
                                    text-white font-medium py-2 px-4 rounded-md transition-all duration-300 relative overflow-hidden`}
                                onClick={handleAddToCart}
                            >
                                {isAddingToCart && (
                                    <span className="absolute inset-0 bg-white/20 animate-ripple rounded-md"></span>
                                )}
                                {isAddedToCart ? `Update Cart (${getCartItem(product.id, selectedSize)?.quantity || 0} in cart)` : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
