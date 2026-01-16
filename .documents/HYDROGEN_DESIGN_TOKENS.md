# Horizon Theme → Hydrogen Design Tokens

This document contains all the design tokens, styles, and patterns from your **Horizon Shopify theme** that you need to port to your **Hydrogen storefront** to maintain visual consistency.

## 🎨 Color Schemes

### Scheme 1 (Primary - White Background)
```css
--color-background: #ffffff;
--color-foreground-heading: #000000;
--color-foreground: rgba(0, 0, 0, 0.81);  /* #000000cf */
--color-primary: rgba(0, 0, 0, 0.81);
--color-primary-hover: #000000;
--color-border: rgba(0, 0, 0, 0.06);  /* #0000000f */
--color-shadow: #000000;

/* Buttons */
--button-primary-bg: #000000;
--button-primary-text: #ffffff;
--button-primary-border: #000000;
--button-primary-hover-bg: #333333;
--button-primary-hover-text: #ffffff;

--button-secondary-bg: transparent;
--button-secondary-text: #000000;
--button-secondary-border: #000000;
--button-secondary-hover-bg: #fafafa;
--button-secondary-hover-text: #333333;

/* Inputs */
--input-bg: rgba(255, 255, 255, 0.78);  /* #ffffffc7 */
--input-text: #333333;
--input-border: #dfdfdf;
--input-hover-bg: rgba(0, 0, 0, 0.01);
```

### Scheme 2 (Light Gray)
```css
--color-background: #f5f5f5;
--color-foreground: rgba(0, 0, 0, 0.81);
--color-border: #dfdfdf;
```

### Scheme 3 (Green Tint)
```css
--color-background: #eef1ea;
--color-foreground: rgba(0, 0, 0, 0.81);
--color-border: rgba(0, 0, 0, 0.81);
```

### Scheme 4 (Blue Tint)
```css
--color-background: #e1edf5;
--color-border: rgba(29, 54, 134, 0.5);  /* #1d368680 */
```

### Scheme 5 (Dark Mode)
```css
--color-background: #333333;
--color-foreground-heading: #ffffff;
--color-foreground: #ffffff;
--color-primary: #ffffff;
--color-border: rgba(255, 255, 255, 0.69);

--button-primary-bg: #ffffff;
--button-primary-text: #000000;
```

---

## 📝 Typography

### Font Families
```css
/* Body Text */
--font-body: 'Grandstander', cursive;
--font-body-weight: 400;

/* Subheadings */
--font-subheading: 'Inter', sans-serif;
--font-subheading-weight: 500;

/* Headings */
--font-heading: 'Inter', sans-serif;
--font-heading-weight: 700;

/* Accent */
--font-accent: 'Inter', sans-serif;
--font-accent-weight: 700;
```

### Typography Scale (Mobile-First)
```css
/* Base */
--font-size-body: 14px;
--line-height-body: 1.75;  /* body-loose */

/* H1 */
--font-size-h1-mobile: 32px;
--font-size-h1-desktop: 56px;
--line-height-h1: 1.1;  /* display-tight */
--letter-spacing-h1: normal;

/* H2 */
--font-size-h2-mobile: 28px;
--font-size-h2-desktop: 48px;
--line-height-h2: 1.1;

/* H3 */
--font-size-h3-mobile: 24px;
--font-size-h3-desktop: 32px;
--line-height-h3: 1.3;

/* H4 */
--font-size-h4: 24px;
--line-height-h4: 1.1;

/* H5 */
--font-size-h5: 14px;
--line-height-h5: 1.75;

/* H6 */
--font-size-h6: 12px;
--line-height-h6: 1.75;
```

### Custom Text Shadows (from custom CSS)
```css
h1, h2 {
  color: white;
  text-shadow: 
    0 0 5px lightblue,
    0 0 15px darkblue,
    0 0 20px darkblue;
}

h3, h4 {
  color: white;
  text-shadow: 
    0 0 5px teal,
    0 0 15px teal,
    0 0 20px teal;
}

h5, h6 {
  color: white;
  text-shadow: 
    0 0 5px hotpink,
    0 0 15px hotpink,
    0 0 20px purple;
}
```

---

## 🔘 Component Styling

### Buttons
```css
/* Primary Button */
.button-primary {
  background: #000000;
  color: #ffffff;
  border: none;
  border-width: 0;
  border-radius: 14px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.25s ease-out;
}

.button-primary:hover {
  background: #333333;
  transform: scale(1.03);
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 14px;
  padding: 12px 24px;
}

.button-secondary:hover {
  background: #fafafa;
  color: #333333;
  border-color: #333333;
}
```

### Cards
```css
.product-card {
  border-radius: 4px;
  background: var(--color-background);
  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
}

/* Hover Effects (choose one) */
/* Lift */
.card-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Scale */
.card-hover-scale:hover {
  transform: scale(1.03);
}

/* Subtle Zoom (on image) */
.card-hover-zoom:hover img {
  transform: scale(1.015);
}
```

### Inputs
```css
.input {
  background: rgba(255, 255, 255, 0.78);
  color: #333333;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
}

.input:hover {
  background: rgba(0, 0, 0, 0.01);
}

.input:focus {
  outline: 2px solid #000000;
  outline-offset: 2px;
}
```

### Badges
```css
.badge {
  border-radius: 100px;  /* fully rounded */
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
}

.badge--sale {
  background: var(--scheme-1-bg);  /* Customize per scheme */
  color: var(--scheme-1-text);
}

.badge--sold-out {
  background: var(--scheme-3-bg);
  color: var(--scheme-3-text);
}
```

### Modals/Drawers
```css
.modal {
  border-radius: 14px;
  background: var(--color-background);
  backdrop-filter: blur(4px);
}

.drawer {
  /* Drop shadow enabled */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```

---

## 📐 Layout & Spacing

### Page Widths
```css
/* Mobile */
--page-margin: 16px;

/* Desktop (min-width: 750px) */
--page-margin: 40px;

/* Page Width: Narrow (default) */
--page-content-width: 1200px;  /* approximate */
--page-width: calc(var(--page-content-width) + (var(--page-margin) * 2));
```

### Border Radius
```css
--border-radius-buttons: 14px;
--border-radius-inputs: 4px;
--border-radius-cards: 4px;
--border-radius-product: 0px;
--border-radius-popovers: 14px;
```

### Hover/Animation Tokens
```css
--hover-lift-amount: 4px;
--hover-scale-amount: 1.03;
--hover-subtle-zoom-amount: 1.015;
--hover-transition-duration: 0.25s;
--hover-transition-timing: ease-out;
--surface-transition-duration: 0.3s;
```

---

## 🎯 Variant Selectors
```css
/* Variant Swatches */
--variant-swatch-width: 31px;
--variant-swatch-height: 34px;
--variant-swatch-radius: 32px;  /* rounded */

/* Variant Buttons */
--variant-button-border-width: 1px;
--variant-button-radius: 14px;
--variant-button-width: equal-width-buttons;  /* or auto */

/* Variant Colors - Default State */
.variant-option {
  background: #ffffff;
  color: #000000;
  border: 1px solid rgba(0, 0, 0, 0.13);
}

.variant-option:hover {
  background: #f5f5f5;
  color: #000000;
  border-color: #e6e6e6;
}

/* Variant Colors - Selected State */
.variant-option--selected {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

.variant-option--selected:hover {
  background: #1a1a1a;
  color: #ffffff;
  border-color: #1a1a1a;
}
```

---

## 🛒 Cart Settings
```css
/* Cart Type: Drawer (not page or popup) */
--cart-type: 'drawer';

/* Cart Features */
--show-cart-note: false;
--show-discount-code: true;

/* Price Font */
--cart-price-font: 'secondary';  /* uses subheading font */
```

---

## 🖼️ Product Settings
```css
/* Product Images */
--product-corner-radius: 0px;
--show-variant-image: false;  /* Don't switch to variant image */

/* Product Page Features */
--currency-code-enabled-product-pages: true;
--currency-code-enabled-product-cards: false;
--currency-code-enabled-cart-items: false;
```

---

## 🌐 Global Features
```css
/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.4) var(--color-background);
}

/* Focus Outlines */
*:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Breakpoints
```css
/* Mobile First */
--breakpoint-mobile: 0px;
--breakpoint-tablet: 750px;
--breakpoint-desktop: 990px;
--breakpoint-wide: 1400px;

/* Usage */
@media screen and (min-width: 750px) { /* tablet+ */ }
@media screen and (min-width: 990px) { /* desktop+ */ }
@media screen and (max-width: 749px) { /* mobile only */ }
```

---

## 🎨 How to Implement in Hydrogen

### 1. Create a global CSS file: `app/styles/theme.css`
```css
/* Copy all the CSS variables above into :root {} */
:root {
  /* Colors */
  --color-background: #ffffff;
  --color-foreground: rgba(0, 0, 0, 0.81);
  /* ... all other tokens ... */
}

/* Include base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  color: var(--color-foreground);
  background: var(--color-background);
}
```

### 2. Import in your Hydrogen root: `app/root.tsx`
```tsx
import './styles/theme.css';
```

### 3. Use Tailwind Config (if using Tailwind)
Create `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        foreground: 'rgba(0, 0, 0, 0.81)',
        background: '#ffffff',
        primary: '#000000',
        // ... map all color tokens
      },
      fontFamily: {
        body: ['Grandstander', 'cursive'],
        heading: ['Inter', 'sans-serif'],
        subheading: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        button: '14px',
        card: '4px',
        input: '4px',
      },
      // ... other tokens
    },
  },
};
```

### 4. Component Pattern - Product Card Example
```tsx
// app/components/ProductCard.tsx
export function ProductCard({ product }) {
  return (
    <article
      className="product-card"
      style={{
        borderRadius: 'var(--border-radius-cards)',
        background: 'var(--color-background)',
        transition: 'transform var(--hover-transition-duration) var(--hover-transition-timing)',
      }}
    >
      {/* Your product card content */}
    </article>
  );
}
```

---

## 📦 Files to Reference

### Key CSS Files from Theme:
1. **`assets/base.css`** - Core design tokens and global styles
2. **`assets/foxify-component-product-card.css`** - Product card styles
3. **`assets/foxify-modal-component.css`** - Modal styles
4. **`config/settings_data.json`** - All theme settings and color schemes

### What to Port:
✅ **Essential:**
- Color schemes (all 6 schemes)
- Typography system (fonts, sizes, weights)
- Button styles
- Card styles
- Spacing/layout tokens
- Border radius values
- Hover effects

✅ **Nice to have:**
- Variant selector styles
- Badge styles
- Modal/drawer animations
- Custom text shadows (if you want that glow effect)

❌ **Skip:**
- Liquid-specific code
- Shopify section configs
- Theme editor schemas

---

## 🚀 Quick Start for Hydrogen

Create this file structure:
```
app/
├── styles/
│   ├── theme.css          ← Core design tokens
│   ├── components.css     ← Reusable component styles
│   └── utilities.css      ← Utility classes
├── components/
│   ├── ProductCard.tsx
│   ├── Button.tsx
│   └── Modal.tsx
└── root.tsx               ← Import styles here
```

Then systematically port each design token category from this document into your Hydrogen CSS files. Use CSS variables for maximum flexibility and theme switching capability.

---

**Need specifics on any component?** Just ask!
