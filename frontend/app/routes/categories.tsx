import { useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
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

export default function Categories() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch products: ' + err.message);
                setLoading(false);
            });
    }, []);

    // Get unique categories and count products in each
    const categoriesWithCount = products.reduce<{ [key: string]: number }>((acc, product) => {
        const category = product.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    // Create array of category objects for rendering
    const categoryEntries = Object.entries(categoriesWithCount).map(([name, count]) => ({ name, count }));

    // Get a representative image for each category
    const categoryImages: { [key: string]: string } = {};
    products.forEach(product => {
        const category = product.category || 'Uncategorized';
        if (!categoryImages[category]) {
            categoryImages[category] = product.image;
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex justify-center items-center p-10">
                    <p className="text-lg">Loading categories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex justify-center items-center p-10">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryEntries.map((category) => (
                        <Link
                            key={category.name}
                            to={`/?category=${encodeURIComponent(category.name)}`}
                            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="h-40 relative">
                                <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
                                <img
                                    src={categoryImages[category.name]}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-white">{category.name}</h2>
                                        <p className="text-white">{category.count} products</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
