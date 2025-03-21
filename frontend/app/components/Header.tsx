import React from 'react';
import { Link } from "@remix-run/react";
import { useShop } from '~/context/ShopContext';

export default function Header() {
    const { cartCount, wishlistCount, isCartLoading, isWishlistLoading } = useShop();

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Clothing Shop
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                    <Link to="/categories" className="hover:text-blue-500">Categories</Link>
                    <Link to="/admin" className="hover:text-blue-500">Admin</Link>

                    <Link to="/wishlist" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlistCount > 0 && (
                            <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isWishlistLoading ? 'animate-pulse' : ''}`}>
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isCartLoading ? 'animate-pulse' : ''}`}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
