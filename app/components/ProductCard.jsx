import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useState } from 'react';

/**
 * ProductCard Component
 * Displays a product card with image, title, price, and a "View" button
 * @param {Object} product - The product data
 * @param {Function} onViewClick - Callback when view button is clicked
 * @param {number} loading - Loading priority ('eager' or 'lazy')
 */
export function ProductCard({ product, onViewClick, loading }) {
    const [isHovered, setIsHovered] = useState(false);

    const variant = product.variants?.nodes?.[0];
    const image = variant?.image || product.featuredImage;

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-card__image-wrapper">
                {image && (
                    <Image
                        data={image}
                        alt={product.title}
                        sizes="(min-width: 45em) 20vw, 50vw"
                        loading={loading}
                        className="product-card__image"
                    />
                )}
                {/* Overlay gradient on hover */}
                <div className={`product-card__overlay ${isHovered ? 'active' : ''}`}>
                    <button
                        className="product-card__view-btn"
                        onClick={() => onViewClick(product)}
                        aria-label={`View ${product.title}`}
                    >
                        <span className="product-card__view-icon">👁</span>
                        <span className="product-card__view-text">View Product</span>
                    </button>
                </div>
            </div>

            <div className="product-card__details">
                <h3 className="product-card__title">
                    {product.title}
                </h3>
                {variant && (
                    <div className="product-card__price">
                        <Money data={variant.price} />
                        {variant.compareAtPrice && (
                            <Money
                                data={variant.compareAtPrice}
                                className="product-card__compare-price"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
