import { useState, useEffect, useRef } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';

/**
 * ProductModal Component
 * AliExpress-style modal for viewing products without losing browsing position
 * 
 * Features:
 * - Opens product details in overlay
 * - Add to cart without leaving collection
 * - Keyboard navigation (ESC to close)
 * - Smooth animations
 * - Prevents body scroll when open
 * 
 * @param {{
 *   product: ProductItemFragment | null;
 *   isOpen: boolean;
 *   onClose: () => void;
 * }}
 */
export function ProductModal({ product, isOpen, onClose }) {
    const modalRef = useRef(null);
    const { open: openCart } = useAside();

    // Handle ESC key to close
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Click outside to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTab = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement?.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement?.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleTab);
            firstElement?.focus();

            return () => {
                document.removeEventListener('keydown', handleTab);
            };
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    const selectedVariant = product.variants?.nodes?.[0];
    const image = product.featuredImage;

    const handleAddToCart = async () => {
        // Small delay to show success feedback
        setTimeout(() => {
            openCart();
        }, 300);
    };

    return (
        <div
            className="product-modal-backdrop"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
            aria-labelledby="product-modal-title"
        >
            <div
                className="product-modal"
                ref={modalRef}
            >
                <button
                    className="product-modal__close"
                    onClick={onClose}
                    aria-label="Close product details"
                >
                    ✕
                </button>

                <div className="product-modal__content">
                    {/* Product Image */}
                    <div className="product-modal__image-section">
                        {image && (
                            <Image
                                alt={image.altText || product.title}
                                aspectRatio="1/1"
                                data={image}
                                loading="eager"
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="product-modal__image"
                            />
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="product-modal__details">
                        <h2 id="product-modal-title" className="product-modal__title">
                            {product.title}
                        </h2>

                        {product.vendor && (
                            <p className="product-modal__vendor">{product.vendor}</p>
                        )}

                        <div className="product-modal__price">
                            {selectedVariant ? (
                                <Money data={selectedVariant.price} />
                            ) : (
                                <Money data={product.priceRange.minVariantPrice} />
                            )}
                        </div>

                        {product.description && (
                            <div className="product-modal__description">
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>
                        )}

                        {/* Variant Selector - Simple version */}
                        {product.variants?.nodes?.length > 1 && (
                            <div className="product-modal__variants">
                                <h3>Options</h3>
                                <p className="product-modal__variants-note">
                                    {product.variants.nodes.length} variants available
                                </p>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="product-modal__actions">
                            {selectedVariant ? (
                                <AddToCartButton
                                    disabled={!selectedVariant.availableForSale}
                                    onClick={handleAddToCart}
                                    lines={[
                                        {
                                            merchandiseId: selectedVariant.id,
                                            quantity: 1,
                                        },
                                    ]}
                                    className="product-modal__add-to-cart"
                                >
                                    {selectedVariant.availableForSale
                                        ? 'Add to Cart'
                                        : 'Sold Out'}
                                </AddToCartButton>
                            ) : (
                                <button
                                    className="product-modal__view-full button-secondary"
                                    onClick={onClose}
                                >
                                    View Full Details
                                </button>
                            )}

                            <a
                                href={`/products/${product.handle}`}
                                className="product-modal__full-details button-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                See Full Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
