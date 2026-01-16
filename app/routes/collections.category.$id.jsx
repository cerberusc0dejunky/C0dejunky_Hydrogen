import { useLoaderData, Link } from 'react-router';
import { COLLECTION_CATEGORIES } from '~/data/collectionCategories';
import { Image } from '@shopify/hydrogen';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
    return [{ title: `${data?.category?.title || 'Category'} | Collections` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ params, context }) {
    const { id } = params;
    const category = COLLECTION_CATEGORIES.find(cat => cat.id === id);

    if (!category) {
        throw new Response('Category Not Found', { status: 404 });
    }

    // Fetch all collections and filter by the category's handles
    // This is more reliable than query parameter for multiple specific handles
    const { collections } = await context.storefront.query(CATEGORY_COLLECTIONS_QUERY);

    const filteredCollections = collections.nodes.filter(col =>
        category.collections.includes(col.handle)
    );

    return {
        category,
        collections: filteredCollections
    };
}

export default function CategoryLanding() {
    /** @type {LoaderReturnData} */
    const { category, collections } = useLoaderData();

    return (
        <div className="category-landing">
            {/* Back link */}
            <Link to="/collections" className="back-to-categories">
                <span>←</span> Back to All Categories
            </Link>

            {/* Hero Banner */}
            <div className="category-hero">
                <div
                    className="category-hero__image"
                    style={{
                        backgroundImage: `url(${category.bannerImage}), linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                    }}
                />
                <div className="category-hero__overlay" />
                <div className="category-hero__content">
                    <h1>{category.emoji} {category.title}</h1>
                    <p className="category-hero__description">{category.description}</p>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="collections-container">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>

            {collections.length === 0 && (
                <div className="no-collections">
                    <p>No collections found for this category yet.</p>
                    <Link to="/collections" className="button-secondary">Browse Other Categories</Link>
                </div>
            )}
        </div>
    );
}

/**
 * CollectionCard Component
 * @param {{collection: any}}
 */
function CollectionCard({ collection }) {
    return (
        <Link to={`/collections/${collection.handle}`} className="collection-card">
            <div className="collection-card__image">
                {collection.image ? (
                    <Image
                        data={collection.image}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 400px, 100vw"
                    />
                ) : (
                    <div className="image-placeholder" />
                )}
            </div>
            <div className="collection-card__info">
                <h4>{collection.title}</h4>
            </div>
        </Link>
    );
}

const CATEGORY_COLLECTIONS_QUERY = `#graphql
  query CategoryCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 250) {
      nodes {
        id
        title
        handle
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections.category.$id').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
