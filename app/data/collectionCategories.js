/**
 * Collection Categories Configuration
 * Define your category banners and which collections belong to each
 */

export const COLLECTION_CATEGORIES = [
    {
        id: 'animals-pet-supplies',
        title: 'Animals & Pet Supplies',
        description: 'Everything your furry friends need',
        emoji: '🐾',
        bannerImage: '/images/categories/pets-banner.jpg', // Add your banner images to public/images/categories/
        collections: [
            'dog-supplies',
            'cat-supplies',
            'pet-toys',
            'pet-food',
            'pet-accessories'
        ],
    },
    {
        id: 'home-garden',
        title: 'Home & Garden',
        description: 'Make your space beautiful',
        emoji: '🏠',
        bannerImage: '/images/categories/home-banner.jpg',
        collections: [
            'furniture',
            'home-decor',
            'kitchen',
            'garden-tools',
            'outdoor'
        ],
    },
    {
        id: 'apparel-accessories',
        title: 'Apparel & Accessories',
        description: 'Style for every occasion',
        emoji: '👕',
        bannerImage: '/images/categories/apparel-banner.jpg',
        collections: [
            'mens-clothing',
            'womens-clothing',
            'accessories',
            'shoes',
            'jewelry'
        ],
    },
    {
        id: 'electronics',
        title: 'Electronics & Tech',
        description: 'Latest gadgets and devices',
        emoji: '📱',
        bannerImage: '/images/categories/electronics-banner.jpg',
        collections: [
            'smartphones',
            'computers',
            'audio',
            'gaming',
            'accessories'
        ],
    },
    {
        id: 'sports-outdoors',
        title: 'Sports & Outdoors',
        description: 'Gear up for adventure',
        emoji: '⚽',
        bannerImage: '/images/categories/sports-banner.jpg',
        collections: [
            'fitness',
            'camping',
            'sports-equipment',
            'outdoor-gear',
            'athletic-wear'
        ],
    },
    {
        id: 'beauty-health',
        title: 'Beauty & Health',
        description: 'Look and feel your best',
        emoji: '💄',
        bannerImage: '/images/categories/beauty-banner.jpg',
        collections: [
            'skincare',
            'makeup',
            'haircare',
            'wellness',
            'fragrances'
        ],
    },
];

/**
 * Get category by ID
 */
export function getCategoryById(id) {
    return COLLECTION_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get category by collection handle
 */
export function getCategoryByCollection(collectionHandle) {
    return COLLECTION_CATEGORIES.find(cat =>
        cat.collections.includes(collectionHandle)
    );
}
