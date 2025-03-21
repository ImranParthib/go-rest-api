import { useEffect, useState } from 'react';
import { useShop } from '~/context/ShopContext';

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
    const [cartTotal, setCartTotal] = useState(0);
    const { refreshCart, setIsCartLoading } = useShop();

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = getStoredCart();
        setCart(storedCart);
        updateCartStats(storedCart);
    }, []);

    // Calculate cart count and total
    const updateCartStats = (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
    };

    // Check if an item is already in the cart with the specified size
    const isInCart = (id: string, size: string): boolean => {
        return cart.some(item => item.id === id && item.size === size);
    };

    // Get item from cart if it exists
    const getCartItem = (id: string, size: string): CartItem | undefined => {
        return cart.find(item => item.id === id && item.size === size);
    };

    // Add item to cart
    const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1, size: string) => {
        setIsCartLoading(true);

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
        refreshCart();

        setTimeout(() => {
            setIsCartLoading(false);
        }, 500);

        return {
            isNewItem: existingItemIndex < 0,
            updatedQuantity: existingItemIndex >= 0 ? newCart[existingItemIndex].quantity : quantity
        };
    };

    // Update item quantity
    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;

        setIsCartLoading(true);

        const newCart = cart.map(item =>
            (item.id === id && item.size === size)
                ? { ...item, quantity }
                : item
        );

        setCart(newCart);
        updateCartStats(newCart);
        saveCart(newCart);
        refreshCart();

        setTimeout(() => {
            setIsCartLoading(false);
        }, 300);
    };

    // Remove item from cart
    const removeItem = (id: string, size: string) => {
        setIsCartLoading(true);

        const newCart = cart.filter(item => !(item.id === id && item.size === size));
        setCart(newCart);
        updateCartStats(newCart);
        saveCart(newCart);
        refreshCart();

        setTimeout(() => {
            setIsCartLoading(false);
        }, 300);
    };

    // Clear cart
    const clearCart = () => {
        setIsCartLoading(true);

        setCart([]);
        setCartTotal(0);
        saveCart([]);
        refreshCart();

        setTimeout(() => {
            setIsCartLoading(false);
        }, 300);
    };

    return {
        cart,
        cartTotal,
        isInCart,
        getCartItem,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };
}
