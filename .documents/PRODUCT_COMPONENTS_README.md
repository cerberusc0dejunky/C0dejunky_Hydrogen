# Product Card & Modal Components

Premium product card components for your Hydrogen store with modern design, smooth animations, and a modal product detail view.

## Features

✨ **Modern Design**
- Glassmorphism effects
- Smooth hover animations
- Neon glow accents
- Responsive layout

🎯 **User Experience**
- "View" button appears on hover
- Modal with product details
- ESC key to close modal
- Click outside to close
- Smooth transitions

🛒 **E-commerce Ready**
- Add to Cart button
- Buy Now button
- Variant selector
- Price display with compare-at pricing
- Product descriptions

## Components

### ProductCard.jsx
Displays a product card with:
- Product image with zoom on hover
- Product title
- Price (with compare-at price if available)
- "View Product" button (shows on hover)

### ProductModal.jsx
Full-screen modal with:
- Large product image
- Product details (vendor, title, price)
- Variant selector (size, color, etc.)
- Add to Cart button
- Buy Now button
- Product description
- Close button (X) in top right corner

### ProductGrid.jsx
Container component that manages:
- Grid of ProductCard components
- Modal state management
- Example usage pattern

## Usage

### In a Collection Page

\`\`\`jsx
import {ProductGrid} from '~/components/ProductGrid';

export default function Collection({data}) {
  const {collection} = data;
  
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <ProductGrid products={collection.products.nodes} />
    </div>
  );
}
\`\`\`

### Manual Implementation

\`\`\`jsx
import {useState} from 'react';
import {ProductCard} from '~/components/ProductCard';
import {ProductModal} from '~/components/ProductModal';

function MyPage({products}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewClick={(product) => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
            loading={index < 8 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
\`\`\`

## Required GraphQL Fragment

Make sure your product query includes these fields:

\`\`\`graphql
fragment ProductCardFragment on Product {
  id
  title
  vendor
  description
  descriptionHtml
  featuredImage {
    id
    url
    altText
    width
    height
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      selectedOptions {
        name
        value
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      image {
        id
        url
        altText
        width
        height
      }
    }
  }
  options {
    name
    values
  }
}
\`\`\`

## Styling

All styles are included in \`app/styles/app.css\`. The components use:
- CSS custom properties from your theme
- Smooth animations and transitions
- Glassmorphism and backdrop blur effects
- Responsive breakpoints
- Accessibility features

### Key CSS Classes

**ProductCard:**
- \`.product-card\` - Main card container
- \`.product-card__image-wrapper\` - Image container
- \`.product-card__overlay\` - Hover overlay
- \`.product-card__view-btn\` - View button
- \`.product-card__details\` - Card details section

**ProductModal:**
- \`.product-modal-backdrop\` - Dark backdrop
- \`.product-modal\` - Modal container
- \`.product-modal__close\` - Close button (X)
- \`.product-modal__content\` - Modal content grid
- \`.product-modal__actions\` - Button container

## Browser Compatibility

The components include vendor prefixes for:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari 9+ (with -webkit- prefixes)
- ✅ Samsung Internet 5+

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation (ESC to close modal)
- Focus management
- Screen reader friendly

## Customization

### Change Colors
Edit the CSS custom properties in \`app.css\`:
\`\`\`css
:root {
  --primary-button-background: #000000;
  --primary-button-text: #ffffff;
  --secondary-button-background: rgba(0, 0, 0, 0);
  --secondary-button-text: #000000;
}
\`\`\`

### Adjust Animations
Modify the transition timings:
\`\`\`css
.product-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
\`\`\`

### Change Modal Size
Adjust the max-width:
\`\`\`css
.product-modal {
  max-width: 1200px; /* Default */
}
\`\`\`

## Known Issues

### Samsung Internet CSS Warning
The linter may show a warning about \`min-width: fit-content\` ordering. This is intentional:
- \`fit-content\` is listed first (standard)
- \`-webkit-fill-available\` is listed second (fallback for older browsers)

This ensures maximum compatibility while following modern CSS practices.

### Safari Backdrop Filter
Safari requires the \`-webkit-backdrop-filter\` prefix. If you see linter warnings, you can add:
\`\`\`css
.product-card__view-btn {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
\`\`\`

## Support

For issues or questions:
1. Check the Hydrogen documentation
2. Review the GraphQL fragments
3. Inspect browser console for errors
4. Ensure all dependencies are installed

## License

MIT - Use freely in your Hydrogen projects
