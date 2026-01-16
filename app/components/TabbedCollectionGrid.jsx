import { useState, useMemo } from 'react';
import { ProductItemWithModal } from './ProductItemWithModal';

/**
 * TabbedCollectionGrid Component
 * Displays products organized by type with filtering options
 * 
 * Features:
 * - Tabs separated by product type
 * - Filters within each tab (price, availability, etc.)
 * - Smooth tab transitions
 * - Maintains filter state per tab
 * 
 * @param {{
 *   products: ProductItemFragment[];
 *   onProductClick?: (product: ProductItemFragment) => void;
 * }}
 */
export function TabbedCollectionGrid({ products, onProductClick }) {
    const [activeTab, setActiveTab] = useState(null);
    const [priceFilter, setPriceFilter] = useState('all');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    // Group products by type
    const productsByType = useMemo(() => {
        const grouped = {};

        products.forEach(product => {
            // Try to extract type from product type or tags
            const type = product.productType || 'Other';

            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(product);
        });

        return grouped;
    }, [products]);

    // Get all types
    const types = Object.keys(productsByType).sort();

    // Set initial active tab
    if (!activeTab && types.length > 0) {
        setActiveTab(types[0]);
    }

    // Get products for active tab (memoized to prevent re-render issues)
    const activeProducts = useMemo(() => {
        return activeTab ? productsByType[activeTab] || [] : [];
    }, [activeTab, productsByType]);

    // Apply filters and sorting
    const filteredProducts = useMemo(() => {
        let filtered = [...activeProducts];

        // Price filter
        if (priceFilter !== 'all') {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.priceRange.minVariantPrice.amount);
                switch (priceFilter) {
                    case 'under-25':
                        return price < 25;
                    case '25-50':
                        return price >= 25 && price < 50;
                    case '50-100':
                        return price >= 50 && price < 100;
                    case 'over-100':
                        return price >= 100;
                    default:
                        return true;
                }
            });
        }

        // Availability filter
        if (availabilityFilter === 'in-stock') {
            filtered = filtered.filter(product =>
                product.availableForSale !== false
            );
        }

        // Sorting
        switch (sortBy) {
            case 'price-low-high':
                filtered.sort((a, b) =>
                    parseFloat(a.priceRange.minVariantPrice.amount) -
                    parseFloat(b.priceRange.minVariantPrice.amount)
                );
                break;
            case 'price-high-low':
                filtered.sort((a, b) =>
                    parseFloat(b.priceRange.minVariantPrice.amount) -
                    parseFloat(a.priceRange.minVariantPrice.amount)
                );
                break;
            case 'title-a-z':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-z-a':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // featured - keep original order
                break;
        }

        return filtered;
    }, [activeProducts, priceFilter, availabilityFilter, sortBy]);

    // Reset filters when changing tabs
    const handleTabChange = (type) => {
        setActiveTab(type);
        setPriceFilter('all');
        setAvailabilityFilter('all');
        setSortBy('featured');
    };

    if (types.length === 0) {
        return <div className="tabbed-collection-empty">No products found</div>;
    }

    return (
        <div className="tabbed-collection">
            {/* Tabs */}
            <div className="tabbed-collection__tabs">
                <div className="tabbed-collection__tabs-wrapper">
                    {types.map(type => (
                        <button
                            key={type}
                            className={`tabbed-collection__tab ${activeTab === type ? 'tabbed-collection__tab--active' : ''
                                }`}
                            onClick={() => handleTabChange(type)}
                        >
                            {type}
                            <span className="tabbed-collection__tab-count">
                                ({productsByType[type].length})
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="tabbed-collection__filters">
                <div className="tabbed-collection__filter-group">
                    <label htmlFor="sort-by" className="tabbed-collection__filter-label">
                        Sort By:
                    </label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="tabbed-collection__filter-select"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="title-a-z">Name: A-Z</option>
                        <option value="title-z-a">Name: Z-A</option>
                    </select>
                </div>

                <div className="tabbed-collection__filter-group">
                    <label htmlFor="price-filter" className="tabbed-collection__filter-label">
                        Price:
                    </label>
                    <select
                        id="price-filter"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="tabbed-collection__filter-select"
                    >
                        <option value="all">All Prices</option>
                        <option value="under-25">Under $25</option>
                        <option value="25-50">$25 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="over-100">Over $100</option>
                    </select>
                </div>

                <div className="tabbed-collection__filter-group">
                    <label htmlFor="availability-filter" className="tabbed-collection__filter-label">
                        Availability:
                    </label>
                    <select
                        id="availability-filter"
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="tabbed-collection__filter-select"
                    >
                        <option value="all">All Products</option>
                        <option value="in-stock">In Stock Only</option>
                    </select>
                </div>

                <div className="tabbed-collection__results-count">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </div>
            </div>

            {/* Products Grid */}
            <div className="tabbed-collection__content">
                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product, index) => (
                            <ProductItemWithModal
                                key={product.id}
                                product={product}
                                loading={index < 8 ? 'eager' : 'lazy'}
                                onClick={() => onProductClick?.(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="tabbed-collection__no-results">
                        <p>No products match your filters.</p>
                        <button
                            onClick={() => {
                                setPriceFilter('all');
                                setAvailabilityFilter('all');
                            }}
                            className="button-secondary"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
