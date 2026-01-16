import { Image, Money } from '@shopify/hydrogen';

/**
 * ProductItemWithModal Component
 * Product card that triggers modal on click instead of navigation
 * 
 * @param {{
 *   product: ProductItemFragment;
 *   loading?: 'eager' | 'lazy';
 *   onClick: () => void;
 * }}
 */
export function ProductItemWithModal({ product, loading, onClick }) {
    const image = product.featuredImage;

    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <article
            className="product-item product-item--clickable"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            aria-label={`View ${product.title}`}
        >
            {image && (
                <div className="product-item__image-wrapper">
                    <Image
                        alt={image.altText || product.title}
                        aspectRatio="1/1"
                        data={image}
                        loading={loading}
                        sizes="(min-width: 45em) 400px, 100vw"
                    />
                </div>
            )}
            <div className="product-item__details">
                <h4 className="product-item__title">{product.title}</h4>
                <div className="product-item__price">
                    <Money data={product.priceRange.minVariantPrice} />
                </div>
            </div>

            {/* Quick view indicator */}
            <div className="product-item__overlay">
                <span className="product-item__quick-view">Quick View</span>
            </div>
        </article>
    );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
