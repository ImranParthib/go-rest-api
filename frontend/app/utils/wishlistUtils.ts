import { useEffect, useState } from 'react';
import { useShop } from '~/context/ShopContext';

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
    size?: string;
    color?: string;
}

// Local storage key for wishlist items
const WISHLIST_STORAGE_KEY = 'clothing-shop-wishlist';

// Save wishlist to local storage
export function saveWishlist(items: WishlistItem[]): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
}

// Get wishlist from local storage
export function getStoredWishlist(): WishlistItem[] {
    if (typeof window !== 'undefined') {
        try {
            const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        } catch (error) {
            console.error('Error parsing wishlist from local storage:', error);
            return [];
        }
    }
    return [];
}

// Custom hook for wishlist functionality
export function useWishlist() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const { refreshWishlist, setIsWishlistLoading } = useShop();

    // Load wishlist from local storage on component mount
    useEffect(() => {
        const storedWishlist = getStoredWishlist();
        setWishlist(storedWishlist);
    }, []);

    // Check if an item is in the wishlist
    const isInWishlist = (id: string): boolean => {
        return wishlist.some(item => item.id === id);
    };

    // Add item to wishlist
    const addToWishlist = (product: WishlistItem) => {
        // Don't add if already in wishlist
        if (isInWishlist(product.id)) return;

        setIsWishlistLoading(true);

        const newWishlist = [...wishlist, product];
        setWishlist(newWishlist);
        saveWishlist(newWishlist);
        refreshWishlist();

        setTimeout(() => {
            setIsWishlistLoading(false);
        }, 500);
    };

    // Remove item from wishlist
    const removeFromWishlist = (id: string) => {
        setIsWishlistLoading(true);

        const newWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(newWishlist);
        saveWishlist(newWishlist);
        refreshWishlist();

        setTimeout(() => {
            setIsWishlistLoading(false);
        }, 300);
    };

    // Toggle item in wishlist (add if not present, remove if present)
    const toggleWishlist = (product: WishlistItem) => {
        setIsWishlistLoading(true);

        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Clear wishlist
    const clearWishlist = () => {
        setIsWishlistLoading(true);

        setWishlist([]);
        saveWishlist([]);
        refreshWishlist();

        setTimeout(() => {
            setIsWishlistLoading(false);
        }, 300);
    };

    return {
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist
    };
}
