import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import React, { useState } from 'react';
import Header from '~/components/Header';
import { useCart } from '~/utils/cartUtils';
import { useWishlist } from '~/utils/wishlistUtils';
import { useShop } from '~/context/ShopContext';
import { useToast } from '~/context/ToastContext';
import LoadingIndicator from '~/components/LoadingIndicator';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  try {
    const response = await fetch(`http://localhost:8080/api/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }

    const product = await response.json();
    return json({ product });
  } catch (error) {
    console.error("Error loading product:", error);
    return json({ error: "Failed to load product", product: null });
  }
};

export default function ProductPage() {
  const { product, error } = useLoaderData<{ product: any, error?: string }>();
  const { addToCart, isInCart, getCartItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { isCartLoading, isWishlistLoading } = useShop();
  const [selectedSize, setSelectedSize] = useState(product?.size || "M");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (error || !product) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The requested product could not be found."}</p>
          <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
        </div>
      </div>
    );
  }

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

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />

              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500">{product.category}</span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full hover:bg-gray-100"
                  disabled={isWishlistLoading}
                >
                  {isWishlistLoading ? (
                    <LoadingIndicator size="sm" color="#ef4444" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
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
                  )}
                  <span className={isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'}>
                    {isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 bg-gray-50">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-red-600 mb-4">${product.price}</p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Color</h2>
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gray-200 mr-2"></span>
                  <span>{product.color}</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Size</h2>
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

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quantity</h2>
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
                className={`w-full ${isInCart(product.id, selectedSize)
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"} 
                  text-white font-medium py-3 px-4 rounded-md transition-all duration-300`}
                onClick={handleAddToCart}
                disabled={isCartLoading || isAddingToCart}
              >
                {(isCartLoading || isAddingToCart) ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingIndicator size="sm" />
                    <span>{isInCart(product.id, selectedSize) ? "Updating..." : "Adding..."}</span>
                  </div>
                ) : (
                  isInCart(product.id, selectedSize)
                    ? `Update Cart (${getCartItem(product.id, selectedSize)?.quantity || 0} in cart)`
                    : "Add to Cart"
                )}
              </button>

              <div className="mt-4">
                <a href="/" className="text-blue-500 hover:underline">
                  &larr; Back to Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
