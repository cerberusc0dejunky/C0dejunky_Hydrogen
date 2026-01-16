import { useEffect, useState } from 'react';
import { Image, Money, AddToCartButton } from '@shopify/hydrogen';
import { useFetcher } from 'react-router';

/**
 * ProductModal Component
 * Modal that displays full product details with purchase options
 * @param {Object} product - The product to display
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Callback to close the modal
 */
export function ProductModal({ product, isOpen, onClose }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const fetcher = useFetcher();

    useEffect(() => {
        if (product?.variants?.nodes?.length) {
            setSelectedVariant(product.variants.nodes[0]);
        }
    }, [product]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const image = selectedVariant?.image || product.featuredImage;
    const isAvailable = selectedVariant?.availableForSale ?? true;

    const handleBuyNow = () => {
        if (!selectedVariant || !isAvailable) return;

        fetcher.submit(
            {
                cartAction: 'BUY_NOW',
                lines: JSON.stringify([
                    {
                        merchandiseId: selectedVariant.id,
                        quantity: 1,
                    },
                ]),
            },
            { method: 'POST', action: '/cart' },
        );
    };

    return (
        <div className="product-modal-backdrop" onClick={onClose}>
            <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Close button */}
                <button
                    className="product-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="product-modal__content">
                    {/* Product Image */}
                    <div className="product-modal__media">
                        {image && (
                            <Image
                                data={image}
                                alt={product.title}
                                sizes="(min-width: 768px) 50vw, 90vw"
                                className="product-modal__image"
                            />
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="product-modal__details">
                        {/* Header */}
                        <div className="product-modal__header">
                            {product.vendor && (
                                <span className="product-modal__vendor">{product.vendor}</span>
                            )}
                            <h2 id="modal-title" className="product-modal__title">
                                {product.title}
                            </h2>
                            <div className="product-modal__price">
                                {selectedVariant && (
                                    <>
                                        <Money data={selectedVariant.price} />
                                        {selectedVariant.compareAtPrice && (
                                            <Money
                                                data={selectedVariant.compareAtPrice}
                                                className="product-modal__compare-price"
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Variant Selector */}
                        {product.options && product.options.length > 0 && (
                            <div className="product-modal__variants">
                                {product.options.map((option) => (
                                    <div key={option.name} className="product-modal__option">
                                        <label className="product-modal__option-label">
                                            {option.name}
                                        </label>
                                        <div className="product-modal__option-values">
                                            {option.values.map((value) => {
                                                const variant = product.variants.nodes.find((v) =>
                                                    v.selectedOptions.some(
                                                        (opt) => opt.name === option.name && opt.value === value
                                                    )
                                                );
                                                const isSelected =
                                                    selectedVariant?.selectedOptions.some(
                                                        (opt) => opt.name === option.name && opt.value === value
                                                    );

                                                return (
                                                    <button
                                                        key={value}
                                                        onClick={() => variant && setSelectedVariant(variant)}
                                                        className={`product-modal__option-btn ${isSelected ? 'active' : ''
                                                            }`}
                                                        disabled={!variant?.availableForSale}
                                                    >
                                                        {value}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="product-modal__actions">
                            <AddToCartButton
                                lines={
                                    selectedVariant
                                        ? [
                                            {
                                                merchandiseId: selectedVariant.id,
                                                quantity: 1,
                                            },
                                        ]
                                        : []
                                }
                                disabled={!isAvailable}
                                className="product-modal__add-btn"
                            >
                                {isAvailable ? 'Add to Cart' : 'Sold Out'}
                            </AddToCartButton>

                            <button
                                onClick={handleBuyNow}
                                disabled={!isAvailable}
                                className="product-modal__buy-btn"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="product-modal__description">
                                <h3 className="product-modal__description-title">Description</h3>
                                <div
                                    className="product-modal__description-text"
                                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
