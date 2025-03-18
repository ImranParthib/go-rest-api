import { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useCart } from '~/utils/cartUtils';
import { useWishlist } from '~/utils/wishlistUtils';
import Header from '~/components/Header';

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

export const loader: LoaderFunction = async ({ params }) => {
    const response = await fetch(`http://localhost:8080/api/products/${params.id}`);

    if (!response.ok) {
        throw new Response("Product not found", { status: 404 });
    }

    const product = await response.json();
    return json({ product });
};

export const meta: MetaFunction = ({ data }) => {
    return [
        { title: data?.product?.name || "Product Details" },
        { name: "description", content: data?.product?.description || "Product details page" },
    ];
};

export default function ProductDetail() {
    const { product } = useLoaderData<{ product: Product }>();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState(product.size || "M");
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    // Available sizes based on the product category
    const availableSizes = product.category === "Footwear"
        ? ["38", "39", "40", "41", "42", "43", "44"]
        : ["XS", "S", "M", "L", "XL", "XXL"];

    // Fetch related products (same category)
    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(products => {
                const related = products
                    .filter((p: Product) => p.category === product.category && p.id !== product.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            })
            .catch(err => console.error('Error fetching related products:', err));
    }, [product.id, product.category]);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: product.color,
            size: selectedSize
        }, quantity, selectedSize);

        setMessage("Added to cart!");

        // Clear message after 3 seconds
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image */}
                        <div className="md:w-1/2 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[400px] md:h-[600px] object-cover"
                            />
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
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
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2 p-6 md:p-8">
                            <div className="mb-4">
                                <span className="text-sm text-gray-500">{product.category}</span>
                                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                                <p className="text-xl md:text-2xl font-bold text-red-600 mt-2">${product.price}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="mb-6">
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
                        `}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
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
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>

                                {message && (
                                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <a
                                    key={relatedProduct.id}
                                    href={`/product/${relatedProduct.id}`}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:translate-y-[-4px] transition-transform"
                                >
                                    <img
                                        src={relatedProduct.image}
                                        alt={relatedProduct.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-1">{relatedProduct.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{relatedProduct.category}</p>
                                        <p className="text-lg font-bold text-red-600">${relatedProduct.price}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-4">Sorry, we couldn't find the product you're looking for.</p>
                    <a href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                        Back to Shop
                    </a>
                </div>
            </div>
        </div>
    );
}
