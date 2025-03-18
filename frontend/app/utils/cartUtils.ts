import { useEffect, useState } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
}

// Local storage key for cart items
const CART_STORAGE_KEY = 'clothing-shop-cart';

// Save cart to local storage
export function saveCart(items: CartItem[]): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
}

// Get cart from local storage
export function getStoredCart(): CartItem[] {
    if (typeof window !== 'undefined') {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Error parsing cart from local storage:', error);
            return [];
        }
    }
    return [];
}

// Custom hook for cart functionality
export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = getStoredCart();
        setCart(storedCart);
        updateCartStats(storedCart);
    }, []);

    // Calculate cart count and total
    const updateCartStats = (items: CartItem[]) => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartCount(count);
        setCartTotal(total);
    };

    // Add item to cart
    const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1, size: string) => {
        const newCart = [...cart];
        const existingItemIndex = newCart.findIndex(
            item => item.id === product.id && item.size === size
        );

        if (existingItemIndex >= 0) {
            // Update quantity if item already in cart
            newCart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            newCart.push({ ...product, quantity, size });
        }

        setCart(newCart);
        updateCartStats(newCart);
        saveCart(newCart);
    };

    // Update item quantity
    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;

        const newCart = cart.map(item =>
            (item.id === id && item.size === size)
                ? { ...item, quantity }
                : item
        );

        setCart(newCart);
        updateCartStats(newCart);
        saveCart(newCart);
    };

    // Remove item from cart
    const removeItem = (id: string, size: string) => {
        const newCart = cart.filter(item => !(item.id === id && item.size === size));
        setCart(newCart);
        updateCartStats(newCart);
        saveCart(newCart);
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        setCartCount(0);
        setCartTotal(0);
        saveCart([]);
    };

    return {
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };
}
