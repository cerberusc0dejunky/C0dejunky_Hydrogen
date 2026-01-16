import { useLoaderData, Link } from 'react-router';
import { COLLECTION_CATEGORIES } from '~/data/collectionCategories';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Shop by Category | Collections' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ context }) {
  // Fetch ALL collections to match with categories
  const { collections } = await context.storefront.query(ALL_COLLECTIONS_QUERY);

  return {
    collections: collections.nodes,
    categories: COLLECTION_CATEGORIES,
  };
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const { categories, collections } = useLoaderData();

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Shop by Category</h1>
        <p className="collections-subtitle">
          Discover our curated collections organized by category
        </p>
      </div>

      <div className="category-cards-grid">
        {categories.map((category) => {
          // Get collections that belong to this category
          const categoryCollections = collections.filter(col =>
            category.collections.includes(col.handle)
          );

          return (
            <CategoryCard
              key={category.id}
              category={category}
              collectionsCount={categoryCollections.length}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * CategoryCard Component
 * @param {{
 *   category: {id: string, title: string, description: string, emoji: string, bannerImage: string};
 *   collectionsCount: number;
 * }}
 */
function CategoryCard({ category, collectionsCount }) {
  return (
    <Link
      to={`/collections/category/${category.id}`}
      className="category-card"
      prefetch="intent"
    >
      <div className="category-card__banner">
        {/* Banner image with fallback gradient */}
        <div
          className="category-card__banner-image"
          style={{
            backgroundImage: `url(${category.bannerImage}), linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
          }}
        >
          <div className="category-card__overlay">
            <span className="category-card__emoji">{category.emoji}</span>
          </div>
        </div>
      </div>

      <div className="category-card__content">
        <h3 className="category-card__title">{category.title}</h3>
        <p className="category-card__description">{category.description}</p>

        <div className="category-card__meta">
          <span className="category-card__count">
            {collectionsCount} {collectionsCount === 1 ? 'Collection' : 'Collections'}
          </span>
          <span className="category-card__arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

const ALL_COLLECTIONS_QUERY = `#graphql
  query AllCollections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
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

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
