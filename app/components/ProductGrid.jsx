import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

/**
 * ProductGrid Component
 * Example usage of ProductCard with ProductModal
 * Use this in your collection pages or anywhere you want to display products
 * 
 * @param {Array} products - Array of product objects from Shopify
 */
export function ProductGrid({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // Wait for animation
    };

    return (
        <>
            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onViewClick={handleViewProduct}
                        loading={index < 8 ? 'eager' : 'lazy'}
                    />
                ))}
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
