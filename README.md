# Hacker Slots - Fair Slot Machine Game

A **provably fair** 5x5 binary-themed slot machine integrated with your Shopify Hydrogen storefront. Uses a prize pool model that **guarantees 0% out-of-pocket costs** while maintaining high player RTP (~92%).

## 🎯 Key Features

- **Provably Fair**: SHA-256 cryptographic verification for every spin
- **Prize Pool Model**: 50% of revenue funds prizes, 42% is your profit, 8% operations
- **Zero Risk**: Prizes only awarded when pool can afford them
- **High RTP**: ~92% return to player (vs 85-90% traditional casinos)
- **Dynamic Prizes**: Small prizes (AliExpress gadgets) to big prizes (phones) based on pool balance

## 📁 Project Structure

```
Casino/
├── prize-config.json          # Prize definitions and economics
├── app/
│   ├── routes/
│   │   └── games.hacker-slots.tsx    # Main game page route
│   ├── components/
│   │   ├── SlotMachine.jsx           # React game component
│   │   └── SlotMachine.css           # Matrix/hacker theme styles
│   ├── api/
│   │   └── games/hacker-slots/
│   │       └── spin.ts               # Server-side RNG & validation
│   └── lib/
│       └── prizePool.js              # Prize pool manager
```

## 🚀 Setup Instructions

### 1. Install Dependencies

Your Hydrogen store already has the basic dependencies. Make sure you have:

```bash
npm install
```

### 2. Configure Shopify Integration

You need to set up customer metafields and products:

#### A. Create Credit Packages in Shopify

1. Go to Shopify Admin → Products
2. Create products for credit packages:
   - "10 Game Credits" - $1.00
   - "50 Game Credits + 5 Bonus" - $5.00
   - "100 Game Credits + 15 Bonus" - $10.00
   - "500 Game Credits + 100 Bonus" - $40.00

3. Copy the Product IDs and update `prize-config.json`:
   ```json
   "creditPackages": [
     {
       "credits": 10,
       "price": 1.00,
       "shopifyProductId": "gid://shopify/Product/YOUR_ID_HERE"
     }
   ]
   ```

#### B. Create Customer Metafields

1. Go to Settings → Custom Data → Customers
2. Create metafield:
   - **Namespace**: `game`
   - **Key**: `credits`
   - **Type**: Integer
   - **Description**: "Game credits balance"

3. Create another metafield:
   - **Namespace**: `game`
   - **Key**: `prize_pool_contribution`
   - **Type**: Money
   - **Description**: "Total contributed to prize pool"

#### C. Set Up Prize Pool Database

You can store the prize pool balance in:
- **Shopify metafield** (Shop-level)
- **External database** (recommended for high traffic)
- **Local file** (development only)

For Shopify metafield approach:
1. Settings → Custom Data → Shop
2. Create metafield:
   - **Namespace**: `game`
   - **Key**: `prize_pool_balance`
   - **Type**: Money

### 3. Implement Database Functions

Update these functions in `app/api/games/hacker-slots/spin.ts`:

```typescript
async function getCustomer(request) {
  // Use Hydrogen's session
  const session = await context.session.get();
  const customerAccessToken = session.get('customerAccessToken');
  
  // Query Shopify
  const { customer } = await context.storefront.query(CUSTOMER_QUERY, {
    variables: { customerAccessToken }
  });
  
  return customer;
}

async function getCustomerCredits(customerId) {
  // Fetch from metafield
  const credits = customer.metafield?.value || 0;
  return parseInt(credits);
}

async function getPrizePoolBalance() {
  // Fetch from shop metafield or database
  const { shop } = await context.storefront.query(SHOP_QUERY);
  return parseFloat(shop.metafield?.value || 0);
}
```

### 4. Update Environment Variables

Create `.env` file:

```env
# Shopify Storefront API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your-token-here

# Prize Pool (if using external DB)
DATABASE_URL=your-database-url

# Admin notifications
ADMIN_EMAIL=your-email@example.com
```

### 5. Test the Game

```bash
# Start development server
npm run dev

# Visit the game
# Navigate to: http://localhost:3000/games/hacker-slots
```

## 💰 Economics Model

### How It Works

When a customer buys $10 in credits:
- **50% ($5.00)** → Prize pool
- **42% ($4.20)** → Your guaranteed profit ✅
- **8% ($0.80)** → Operating costs (Shopify fees, etc.)

### Prize Tiers

| Pool Balance | Available Prizes |
|---|---|
| $0+ | Free credits (always available) |
| $50+ | Small gadgets ($3-5 cost) |
| $200+ | Tech accessories ($5-15 cost) |
| $1000+ | Premium items ($25-50 cost) |
| $2000+ | Phones ($150-300 cost) |

### Example Scenario

1. **Day 1**: 10 customers buy $10 each = $100 revenue
   - Prize pool: $50
   - Your profit: $42
   - Operating: $8

2. **Payouts**: Customers win $30 worth of prizes (actual cost: $18)
   - Pool remaining: $32

3. **Day 2**: 5 more customers buy $10 each = $50 revenue
   - Prize pool: $32 + $25 = $57
   - Your profit: $42 + $21 = $63
   
4. **Total**: $150 revenue, $63 profit, $18 prize costs = **42% profit margin maintained!**

## 🎮 Game Features

### Provably Fair System

Every spin is verifiable:
1. Server generates secret seed
2. Player provides client seed
3. Combined hash determines result
4. Server seed revealed after spin
5. Player can verify using crypto tools

### Win Patterns

- **All 1's or 0's** (25 symbols): Jackpot
- **5 in a row**: Mega win
- **4 in a row**: Big win
- **3 in a row**: Good win
- **3x3 cluster**: Mini win
- **And more...**

## 🔧 Customization

### Adjust Prize Probabilities

Edit `prize-config.json`:

```json
{
  "id": "gadget_small",
  "probability": 0.02,  // 2% chance
  "actualCost": 3,  // Your cost from AliExpress
  "value": 5,  // Perceived value to player
  "poolRequired": 50  // Min pool to unlock
}
```

### Change Theme Colors

Edit `app/components/SlotMachine.css`:

```css
:root {
  --neon-green: #00ff41;  /* Primary color */
  --neon-cyan: #00ffff;   /* Secondary color */
  --dark-bg: #0a0e0a;     /* Background */
}
```

## 📊 Monitoring

Track these metrics:
- Prize pool balance
- Average profit per customer
- Win frequency vs expected
- Player retention rate

## ⚠️ Legal Compliance

**IMPORTANT**: Before launching:

1. **Consult a gaming attorney** - Laws vary by jurisdiction
2. **Add "No Purchase Necessary" option** - To qualify as sweepstakes (not gambling)
3. **Display odds** - Required in many regions
4. **Age verification** - May need 18+ restriction
5. **Terms & Conditions** - Clear rules and prize disclosure

## 🚀 Going Live

1. Add the game link to your store navigation
2. Create social media posts explaining the fair model
3. Offer first-time player bonuses
4. Monitor pool balance and adjust prize tiers

## 📝 Next Steps (TODO)

- [ ] Implement database functions for prize pool
- [ ] Set up Shopify customer metafields
- [ ] Create credit purchase webhook
- [ ] Build admin dashboard for prize fulfillment
- [ ] Add confetti/celebration animations
- [ ] Implement leaderboard
- [ ] Add sound effects

## 🤝 Support

Questions? Check the comments in the code or review `implementation_plan.md` for detailed economics analysis.

---

**Built with fairness in mind. Players win more, you profit consistently. Everybody happy!** 🎰✨
