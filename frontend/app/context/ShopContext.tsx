import { createContext, useContext, useState, useEffect } from 'react';
import { getStoredCart, saveCart } from '~/utils/cartUtils';
import { getStoredWishlist, saveWishlist } from '~/utils/wishlistUtils';

type ShopContextType = {
  refreshCart: () => void;
  refreshWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  isCartLoading: boolean;
  isWishlistLoading: boolean;
  setIsCartLoading: (loading: boolean) => void;
  setIsWishlistLoading: (loading: boolean) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Initialize counts on mount
  useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, []);

  const refreshCart = () => {
    const storedCart = getStoredCart();
    const count = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const refreshWishlist = () => {
    const storedWishlist = getStoredWishlist();
    setWishlistCount(storedWishlist.length);
  };

  const value = {
    refreshCart,
    refreshWishlist,
    cartCount,
    wishlistCount,
    isCartLoading,
    isWishlistLoading,
    setIsCartLoading,
    setIsWishlistLoading
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
