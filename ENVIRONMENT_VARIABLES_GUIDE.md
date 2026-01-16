# Environment Variables Guide for Hydrogen

## 📝 Where to Put API Keys

All sensitive API keys, tokens, and credentials should go in the `.env` file at the root of your project.

## 🔐 Security Rules

### PUBLIC vs PRIVATE Variables

**PUBLIC_** prefix:
- ✅ Safe to expose to the browser
- Example: `PUBLIC_STOREFRONT_API_TOKEN`
- Used in client-side components
- Visible in browser dev tools

**PRIVATE_** or no prefix:
- ⛔ NEVER expose to the browser
- Example: `PRIVATE_ADMIN_API_KEY`
- Only use in server-side code (loaders, actions)
- Stay on the server

## 📋 Required Environment Variables

### 1. Shopify Storefront API
```env
PUBLIC_STOREFRONT_API_TOKEN=shpat_xxxxxxxxxxxxx
PUBLIC_STORE_DOMAIN=your-store.myshopify.com
```

**Where to find:**
1. Go to Shopify Admin
2. Settings > Apps and sales channels
3. Click "Develop apps"
4. Create an app or select existing
5. Configure Storefront API scopes
6. Get your Storefront API access token

### 2. Customer Account API (for login features)
```env
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=shp_xxxxxxxx-xxxx-xxxx
PUBLIC_CUSTOMER_ACCOUNT_API_URL=https://shopify.com/XXXXXXXX
```

**Where to find:**
1. Shopify Admin > Settings > Customer accounts
2. Choose "New customer accounts"
3. Application setup section
4. Create or select your app
5. Copy Client ID and API URL

### 3. Session Secret
```env
SESSION_SECRET=a-very-long-random-string-here
```

**Generate a secure secret:**
```bash
# Run this in terminal to generate a random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔧 How to Use in Your Code

### In Server-Side Code (Loaders/Actions)
```jsx
// app/routes/products._index.jsx
export async function loader({context}) {
  const {env} = context;
  
  // Access environment variables
  const apiToken = env.PUBLIC_STOREFRONT_API_TOKEN;
  const storeDomain = env.PUBLIC_STORE_DOMAIN;
  
  // Use them safely on the server
}
```

### In Client-Side Components
```jsx
// Only PUBLIC_ variables are available
const domain = window.ENV.PUBLIC_STORE_DOMAIN;
```

### TypeScript Support
Update `env.d.ts` to get autocomplete:
```typescript
declare global {
  interface Env {
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    PRIVATE_STOREFRONT_API_TOKEN?: string;
    SESSION_SECRET: string;
  }
}
```

## 🚫 What NOT to Do

❌ **Don't commit .env to git**
- Already in `.gitignore` ✅
- Contains sensitive credentials

❌ **Don't expose PRIVATE_ variables to client**
```jsx
// BAD - Don't do this!
<meta content={env.PRIVATE_API_KEY} />
```

❌ **Don't hardcode credentials**
```jsx
// BAD
const API_KEY = "shpat_123456789";

// GOOD
const apiKey = env.PUBLIC_STOREFRONT_API_TOKEN;
```

## 📂 Production Deployment

### For Oxygen (Shopify Hosting)
1. Run `npm run deploy`
2. Variables are automatically pulled from your Shopify app
3. Or set in Oxygen dashboard

### For Other Platforms (Vercel, Netlify, etc.)
Add environment variables in their dashboard:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Railway: Project > Variables

## 🔄 Development vs Production

Create different files for each environment:
- `.env` - Local development (gitignored)
- `.env.example` - Template for other developers (committed)
- Production - Set in hosting platform dashboard

## ✅ Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Fill in your actual API keys
- [ ] Verify `.env` is in `.gitignore`
- [ ] Test that variables load in your app
- [ ] Set production variables in hosting dashboard
- [ ] Never commit real credentials to git

## 🆘 Troubleshooting

**Variables not loading?**
1. Restart your dev server (`npm run dev`)
2. Check variable names match exactly (case-sensitive)
3. Verify `.env` is in the root directory
4. Check for syntax errors (no spaces around `=`)

**TypeScript errors?**
- Update `env.d.ts` with your variable types
- Restart TypeScript server in your IDE

## 📚 Resources

- [Hydrogen Docs: Environment Variables](https://shopify.dev/docs/custom-storefronts/hydrogen/environment-variables)
- [Remix Docs: Environment Variables](https://remix.run/docs/en/main/guides/envvars)
- [Shopify Admin API Access](https://shopify.dev/docs/apps/auth/admin-app-access-tokens)
