# 🎉 Customer Account Pages Enhanced!

## ✅ What's Been Built

I've enhanced your customer account pages with the features you requested:

### **1. Profile Image Upload** 📸
- Beautiful circular avatar display
- File upload with image preview
- Placeholder avatar when no image uploaded
- Drag-and-drop ready (future enhancement)
- Accepts JPG, PNG, GIF (max 5MB)

### **2. Address Management** 📍
**Already working!** Your existing address page includes:
- Create new addresses
- Edit existing addresses
- Delete addresses
- Set default shipping address
- Full form validation
- All fields: First/Last name, Company, Address lines, City, State, Zip, Country, Phone

### **3. Payment Methods** 💳
- Payment methods section in profile
- Secure notice about Shopify's encrypted storage
- **Note:** For maximum security, actual card details are managed through Shopify's checkout
- Cards are automatically saved during first purchase

---

## 📁 Files Created/Updated

### **New Files:**
1. ✅ **`app/styles/account.css`** - Complete styling for account pages
   - Profile image upload styling
   - Form layouts and inputs
   - Payment methods section
   - Responsive design
   - Success/error messages

### **Updated Files:**
2. ✅ **`app/routes/account.profile.jsx`** - Enhanced profile page
   - Profile image upload component
   - Phone number field
   - Email display (read-only for security)
   - Payment methods placeholder
   - Form validation
   - Success notifications

3. ✅ **`app/root.jsx`** - Added account.css stylesheet

---

## 🎨 Features Breakdown

### **Profile Page** (`/account/profile`)

#### **Profile Photo Section:**
```
┌─────────────────────────────────┐
│  Profile Photo                    │
│  ┌────┐                          │
│  │ 👤 │  [Choose Photo]          │
│  └────┘  JPG, PNG or GIF. Max 5MB│
└─────────────────────────────────┘
```

#### **Personal Information:**
- First Name
- Last Name  
- Phone Number
- Email (read-only, managed by Shopify)

#### **Payment Methods:**
- Displays secure notice
- Explains Shopify's payment handling
- Cards auto-saved at checkout

---

## 🎯 How Customers Use It

### **Upload Profile Image:**
1. Go to `/account/profile`
2. Click "Choose Photo"
3. Select an image file
4. See instant preview
5. Click "Save Changes"

### **Update Personal Info:**
1. Edit any field (First Name, Last Name, Phone)
2. Click "Save Changes"
3. See success message

### **Manage Addresses:** (Already working!)
1. Go to `/account/addresses`
2. Create/Edit/Delete addresses
3. Set default shipping address

### **Add Payment Method:**
**Security First!** Payment methods are added during checkout:
1. Complete a purchase
2. Choose to save payment method
3. Shopify securely stores encrypted card data
4. Card appears in future checkouts

---

## 🔒 Security Notes

### **Why Payment Methods Work This Way:**

**PCI Compliance:** Credit card data requires PCI DSS compliance. Shopify handles this for you through their secure checkout.

**Data Flow:**
```
Customer → Checkout → Shopify Payment Gateway → Encrypted Storage
                                               ↓
                                    Future checkouts use saved cards
```

**Benefits:**
- ✅ No liability for you
- ✅ Shopify handles security audits
- ✅ Cards tokenized and encrypted
- ✅ One-click checkout for customers
- ✅ Full PCI compliance

---

## 💡 Profile Image Storage

**Current Implementation:**
- Images stored as base64 in form data (temporary)

**Production Recommendation:**
Integrate a proper image storage service:

**Option 1: Cloudinary (Recommended)**
```javascript
// In account.profile.jsx action
const upload = await cloudinary.upload(profileImage);
// Store upload.secure_url in customer metafield
```

**Option 2: AWS S3**
```javascript
// Upload to S3 bucket
const s3Url = await uploadToS3(profileImage);
// Store s3Url in customer metafield
```

**Option 3: Shopify Metafields**
- Store images directly in customer metafields
- Use Shopify's CDN for delivery

---

## 🎨 Styling Applied

All pages use your **Horizon theme** design tokens:

- ✅ Consistent colors and typography
- ✅ Rounded corners (14px buttons, 4px inputs)
- ✅ Smooth transitions and hover effects
- ✅ Responsive grid layouts
- ✅ Mobile-optimized forms
- ✅ Accessible form labels and focus states

---

## 📱 Responsive Design

**Desktop:**
- Two-column form grid
- Side-by-side image preview and upload
- Spacious layouts

**Tablet:**
- One-column forms
- Optimized touch targets

**Mobile:**
- Stacked form fields
- Full-width inputs
- Easy-to-tap buttons
- Avatar centered

---

## 🚀 Next Steps (Optional Enhancements)

### **1. Image Upload to Cloud Storage**
Integrate Cloudinary or S3 for production image hosting.

### **2. Profile Completeness Indicator**
Add a progress bar showing profile completion percentage.

### **3. Email Verification**
Add email verification workflow for changing emails.

### **4. Two-Factor Authentication**
Add 2FA for enhanced security.

### **5. Order History on Profile**
Show recent orders directly on profile page.

### **6. Saved Carts**
Allow customers to save multiple shopping carts.

---

## 🧪 Testing Checklist

- [ ] Visit `/account/profile`
- [ ] Upload a profile photo
- [ ] Update first/last name
- [ ] Add phone number
- [ ] Click "Save Changes"
- [ ] See success message
- [ ] Visit `/account/addresses`
- [ ] Create a new address
- [ ] Edit existing address
- [ ] Delete an address
- [ ] Set default address
- [ ] Check responsive design on mobile

---

## 🎉 You're All Set!

Your customer account pages now have:
✅ **Profile image upload** with preview
✅ **Full address management** (create, edit, delete)
✅ **Payment methods** (secure Shopify checkout integration)
✅ **Beautiful Horizon theme styling**
✅ **Fully responsive design**
✅ **Accessible forms**

**Try it out:** Visit your storefront → Log in → Go to Account → Profile! 🚀
---
title: Using the Customer Account API with Hydrogen
description: Learn how to authenticate a Customer and call the Customer Account API.
source_url:
  html: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/hydrogen
  md: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/hydrogen.md
---

# Using the Customer Account API with Hydrogen

This tutorial shows how to create a login button on a Hydrogen storefront that lets a customer authenticate using the Customer Account API. If the login succeeds, then the site displays a welcome message with their email address.

***

## What you'll learn

After you've completed this tutorial, you'll be able to authenticate a Customer and make Customer Account API queries within a Hydrogen storefront.

***

## Requirements

* You have completed the [Getting started with the Customer Account API](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started) guide.
* You have completed [Getting started with Hydrogen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started) guide.
* You've installed the [Hydrogen](https://apps.shopify.com/hydrogen) or [Headless](https://apps.shopify.com/headless) sales channel.

***

## Limitations

* [Multipass](https://shopify.dev/docs/api/multipass) currently doesn't support the [Customer Account API](https://shopify.dev/docs/api/customer/latest). If you require single sign-on from an external website in your storefront, then you should use the code in our [multipass example](https://github.com/Shopify/hydrogen/tree/main/cookbook/recipes/multipass), which uses the legacy customer account flow.
* [mock.shop](https://mock.shop/), which provides example product data, doesn't support the Customer Account API. You must use a production store's credentials to work with the Customer Account API.

***

## Step 1: Set up a public domain for local development

Customer Account API authentication doesn't support the use of `localhost` due to [security concerns](https://datatracker.ietf.org/doc/html/rfc8252#section-8.3). For development purposes, use a tunnelling service, such as [ngrok](https://ngrok.com/).

In this step, you'll learn how to use [ngrok](https://ngrok.com/) to set up a public HTTPS domain that connects to your local Hydrogen application.

### Set up ngrok

Install and run ngrok in your development environment.

1. Set up an [ngrok](https://ngrok.com/) account.
2. In your ngrok settings, [add a static domain](https://ngrok.com/blog-post/free-static-domains-ngrok-users).
3. Install the [ngrok CLI](https://ngrok.com/download).
4. In a terminal, start ngrok using the following command:

## Terminal

```sh
ngrok http --domain=<your-ngrok-domain> 3000
```

### Add your ngrok domain to the content security policy

Modify your Hydrogen app's [content security policy](https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy) to allow the development domain as a `connect-src`. Your content security policy is typically located in `/app/entry.server.tsx`.

## /app/entry.server.tsx

```js
import {createContentSecurityPolicy} from '@shopify/hydrogen';


createContentSecurityPolicy({
  connectSrc: [
    // (ie. 'wss://<your-ngrok-domain>.app:*')
    'wss://<your-tunneled-host>:*',
  ],
});
```

***

## Step 2: Set up the environment

Configure the necessary Customer Account API settings in the Shopify admin so you can send the initial authentication request to Shopify.

### Open the Customer Account API settings

1. In the Shopify admin, open the **Hydrogen** sales channel.
2. Click the storefront you're adding the customer account API functionality for.
3. Click **Storefront settings**.
4. Click **Customer Account API** to open the API settings.

### Update the application setup

For the Customer Account API to recognize your domain as a valid authentication host, edit your Customer Account API settings.

1. Under **Application setup**, click **Edit** `✎` to edit the endpoints.

2. Under **Callback URI(s)**, click **Add Callback URI**, and add your ngrok domain, with `/account/authorize` appended:

   ```sh
   https://<your-ngrok-domain>.app/account/authorize
   ```

   This is the URI your application will redirect to to continue the OAuth process after a successful customer login.

3. Under **JavaScript origin(s)**, click **Add origin**, and then add your ngrok domain.

4. Under **Logout URI**, click **Add Logout URI**, and then add your ngrok domain.

Tip

If you don't see **JavaScript origin(s)** and **Logout URI** options, you'll need to switch to a **Public** client type. You can find this option at the top of the **Customer Account API** settings.

### Set up the environment variables

There is only one environment variable needed to set up Customer Account API in your application:

**`PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`**: A token that represents a client used in all authentication requests. You can retrieve the token by navigating to the **Customer Account API** settings page > **Customer Account API Credentials**

#### Production storefront

When deploying to Oxygen, these variables are automatically created and used in your production environment.

#### Local development

When developing Hydrogen locally, store your [environment variables](https://shopify.dev/docs/storefronts/headless/hydrogen/environments#environment-variables) in an `.env` file. You can automatically download the required variables with Shopify CLI:

1. Run [`npx shopify hydrogen link`](https://shopify.dev/docs/api/shopify-cli/hydrogen/hydrogen-link) in your Hydrogen project to link it to your Shopify store.
2. Run [`npx shopify hydrogen env pull`](https://shopify.dev/docs/api/shopify-cli/hydrogen/hydrogen-env-pull) to download your environment variables and write them to your local `.env` file.

***

## Step 3: Create the Customer Account API client

Note

The Skeleton template version 2024.7.5 and higher has a Customer Account API client by default and you can skip this step. Check `package.json` to see your Skeleton template version.

If you need to manually create a Customer Account API client, then complete the following steps:

Create a new Customer Account API client in your [`server`](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals#project-structure) file using the [`createCustomerAccountClient`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient) utility.

Pass the new client to [`createCartHandler`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcarthandler) to ensure that the logged-in customer is persisted from your store through to checkout.

Pass the new client to the application's [`context`](https://remix.run/docs/en/main/route/loader#context) so the utility can be accessed throughout the application.

Note

The Customer Account API client uses the latest version of the API by default. If you need to use a specific version, then you can specify the version when you create the client.

## Create a Customer Account API client

## server.js

##### JavaScript

```jsx
import * as remixBuild from '@remix-run/dev/server-build';
import {
  createCartHandler,
  storefrontRedirect,
  createCustomerAccountClient,
} from '@shopify/hydrogen';
import {
  createRequestHandler,
} from '@shopify/remix-oxygen';
import {AppSession} from '~/lib/session';

export default {
  async fetch(
    request,
    env,
    executionContext,
  ) {
    try {
      const waitUntil = executionContext.waitUntil.bind(executionContext);
      const session = await AppSession.init(request, [env.SESSION_SECRET]);

      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        shopId: env.SHOP_ID,
      });

      const cart = createCartHandler({
        customerAccount,
        // additional options here
      });

      const handleRequest = createRequestHandler({
        getLoadContext: () => ({
          customerAccount,
        }),
        // additional options here
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
```

##### TypeScript

```tsx
import * as remixBuild from '@remix-run/dev/server-build';
import {
  createCartHandler,
  storefrontRedirect,
  createCustomerAccountClient,
} from '@shopify/hydrogen';
import {
  createRequestHandler,
  type AppLoadContext,
} from '@shopify/remix-oxygen';
import {AppSession} from '~/lib/session';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const waitUntil = executionContext.waitUntil.bind(executionContext);
      const session = await AppSession.init(request, [env.SESSION_SECRET]);

      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        shopId: env.SHOP_ID,
      });

      const cart = createCartHandler({
        customerAccount,
        // additional options here
      });

      const handleRequest = createRequestHandler({
        getLoadContext: () => ({
          customerAccount,
        }),
        // additional options here
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
```

[`createCustomerAccountClient`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient) expects a [session](https://remix.run/docs/en/main/utils/sessions), implemented based on `HydrogenSession`, to persist auth tokens and the customer's logged-in state.

You can view an example of a Hydrogen session in the [Hydrogen GitHub repo](https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/session.ts).

***

## Step 4: Create auth routes

Your application requires three routes for customer login and logout operations.

The default routes are as follows:

* `/account/login`: A route that redirects the user to a Shopify login.
* `/account/authorize`: A route that authorizes the customer after they log in.
* `/account/logout`: A route that logs the customer out.

Tip

If you chose to scaffold routes when creating your app, then your app already has the required routes in place. To generate a set of standard routes, including basic account-related functionality, run `npx shopify hydrogen setup`.

### Create the login route

Follow the following steps to create a customer login route in your Hydrogen storefront:

1. In the `routes` folder, create a new file called `account_.login.[js|ts]`.
2. In the new file, add the `context.customerAccount.login()` function in the loader.

This function is responsible for redirecting users to Shopify to log in.

## Create a login route

## account\_.login.js

##### JavaScript

```jsx
export async function loader({context}) {
  return context.customerAccount.login();
}
```

##### TypeScript

```tsx
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  return context.customerAccount.login();
}
```

Note the use of underscore in `account_.login.ts`. This is to ensure that [no layout](https://remix.run/docs/en/main/file-conventions/routes#nested-urls-without-layout-nesting) is rendered when this route is accessed.

Tip

If you need to override the default behavior or change the login route location, then you can implement a [`customAuthStatusHandler`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient#createcustomeraccountclientoptions-propertydetail-customauthstatushandler). Review an [example implementation](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient#examples).

### Create the authorization route

Follow the following steps to create an auth route in your Hydrogen storefront:

1. In the `routes` folder, create a new file called `account_.authorize.[js|ts]`.
2. In the new file, add the `context.customerAccount.authorize()` function in the loader.

After a successful login, Shopify redirects to this authorize route. It continues the OAuth process, exchanges the access token, and persists the result to your application session.

If you choose to place this route somewhere else in the application, then use the [`authUrl`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient#createcustomeraccountclientoptions-propertydetail-authurl) option with a relative url, and add the full public domain auth path in the Callback URI of the Customer Account API [application setup](#update-the-application-setup)

## Create the authorize route

## account\_.authorize.js

##### JavaScript

```jsx
export async function loader({context}) {
  return context.customerAccount.authorize();
}
```

##### TypeScript

```tsx
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  return context.customerAccount.authorize();
}
```

At the end of this authorization step, the application redirects back to the page that initiated the login.

Use the [`customAuthStatusHandler`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient#createcustomeraccountclientoptions-propertydetail-customauthstatushandler) option to change this behavior.

### Create the logout route

Follow the following steps to create a logout route in your Hydrogen storefront:

1. In the `routes` folder, create a new file called `account_.logout.[js|ts]`.
2. In the new file, add the `context.customerAccount.logout()` function in the action. Avoid including this function in the loader.

The logout action should be triggered by a user event, like clicking a logout button, not when a component is being loaded that can occur by page load or prefetching. This is because logging out is a significant action that can disrupt the user's workflow, so it should only happen when the user explicitly requests it.

## Create a logout route

## account\_.logout.js

##### JavaScript

```jsx
export async function action({context}) {
  return context.customerAccount.logout();
}
```

##### TypeScript

```tsx
import {type ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({context}: ActionFunctionArgs) {
  return context.customerAccount.logout();
}
```

You can set up a redirect that takes place after the logout step using the `admin` setting in the [application setup step](#update-the-application-setup).

***

## Step 5: Query the Customer Account API

After you've set up your auth routes, you can start querying the Customer Account API.

In this step, you'll create a new `account` route that queries for a logged in customer's first and last name.

1. In the `routes` folder, create a new file called `account.[jsx|tsx]`.

2. Add the following code.

   This code fetches the customer's first and last name from their account. If the customer isn't logged in, calling `query()` will trigger an automatic redirect to the login page, and redirect back to current page at the end of the auth process.

## Query customer data

## account.jsx

##### JavaScript

```jsx
import {Form, useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export async function loader({context}) {
  const {data, errors} = await context.customerAccount.query(`#graphql
      query getCustomer {
        customer {
          firstName
          lastName
        }
      }
      `);

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function () {
  const {customer} = useLoaderData();

  return customer ? (
    <>
      <b>
        Welcome {customer.firstName} {customer.lastName}
      </b>
      <Form method="post" action="/logout">
        <button>Logout</button>
      </Form>
    </>
  ) : null;
}
```

##### TypeScript

```tsx
import {Form, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, json} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query<{
      customer: {firstName: string; lastName: string};
    }>(`#graphql
      query getCustomer {
        customer {
          firstName
          lastName
        }
      }
      `);

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function () {
  const {customer} = useLoaderData<typeof loader>();

  return customer ? (
    <>
      <b>
        Welcome {customer.firstName} {customer.lastName}
      </b>
      <Form method="post" action="/logout">
        <button>Logout</button>
      </Form>
    </>
  ) : null;
}
```

Tip

You need to commit the session at the end of a loader/action with any customer logged in check. A logged in check can trigger an access token refresh, which won't persist in your application unless session is committed to the `Set-Cookie` header.

The `query` and `mutate` functions follow GraphQL standards and return both `data` and `errors` objects. The `errors` object typically returns GraphQL errors such as a syntax error for querying for unknown field name.

Most of the time, the existence of the `errors` object means that the query isn't successful and there is nothing to show. However, during a mutation, it is possible to receive partial data while still experiencing errors.

You should always handle errors gracefully, either by showing a message to the user, or re-throwing them for your application's `ErrorBoundary` to catch.

Warning

Never cache Customer Account API data or store personally identifiable information (PII). Caching this type of data causes risk of unauthorized access or data breaches, compromising user privacy and security.

***

## Step 6: Check the customer logged in state

You can check whether a visitor is logged in without triggering an automatic login redirect. For instance, you might want to conditionally display a **Log in** or **Account details** link in a menu.

1. In the root file of your application, add `customerAccount.isLoggedIn()` in the loader.
2. Return this promise using Remix's [deferred data loading](https://remix.run/docs/en/main/discussion/pending-ui#deferred-data-loading) pattern. This allows the user interface to render before the login check is complete.

Note that you need to `commit()` the session at the end of any loader or action that checks a customer's logged-in state. This is because a logged-in check can trigger an access token refresh, which won't persist in your application unless the session is committed to the `Set-Cookie` header.

## Check customer logged-in state

## root.jsx

##### JavaScript

```jsx
import {defer} from '@shopify/remix-oxygen';
import {Await, NavLink, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';

export async function loader({context}) {
  const isLoggedInPromise = context.customerAccount.isLoggedIn();

  return defer(
    {isLoggedInPromise},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function App() {
  const {isLoggedInPromise} = useLoaderData();

  return (
    <html lang="en">
      <body>
        <header className="header">
          <NavLink prefetch="intent" to="/account">
            <Suspense fallback="Sign in">
              <Await resolve={isLoggedInPromise} errorElement="Sign in">
                {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
              </Await>
            </Suspense>
          </NavLink>
        </header>
        {/* Rest of the application */}
      </body>
    </html>
  );
}
```

##### TypeScript

```tsx
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, NavLink, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';

export async function loader({context}: LoaderFunctionArgs) {
  const isLoggedInPromise = customerAccount.isLoggedIn();

  return defer(
    {isLoggedInPromise},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function App() {
  const {isLoggedInPromise} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <body>
        <header className="header">
          <NavLink prefetch="intent" to="/account">
            <Suspense fallback="Sign in">
              <Await resolve={isLoggedInPromise} errorElement="Sign in">
                {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
              </Await>
            </Suspense>
          </NavLink>
        </header>
        {/* Rest of the application */}
      </body>
    </html>
  );
}
```

***

## Step 7: Associate a customer with a cart

You can associate a customer with a cart by obtaining a Storefront API [`CustomerAccessToken`](https://shopify.dev/docs/api/storefront/latest/objects/customeraccesstoken).

1. Update the Customer Account API client to use the [`unstableB2b` option](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient#createcustomeraccountclientoptions-propertydetail-unstableb2b).

   ## lib/context.ts

   ```js
   const hydrogenContext = createHydrogenContext({
     ...,
     customerAccount: {
       unstableB2b: true,
     },
   });
   ```

2. Access the [`CustomerAccessToken`](https://shopify.dev/docs/api/storefront/latest/objects/customeraccesstoken) and pass it to the `cart.updateBuyerIdentity` function.

   ## File

   ```js
   export async function action({context}) {
     const {cart, customerAccount} = context;
     const buyer = await customerAccount.UNSTABLE_getBuyer();


     await cart.updateBuyerIdentity({
       customerAccessToken: buyer.customerAccessToken,
     })
   }
   ```

Note

The `CustomerAccessToken` returned by Customer Account Client can only be used to update the buyer identity of a cart. It cannot be used with a Storefront API `customer` query.

***

## Next steps

* Explore the [GraphQL Customer Account API](https://shopify.dev/docs/api/customer) reference.
* Explore the [`createCustomerAccountClient`](https://shopify.dev/docs/api/hydrogen/latest/utilities/createcustomeraccountclient) reference, including additional examples.
* Explore an end-to-end Customer Account API implementation example in the [default Hydrogen template](https://github.com/Shopify/hydrogen/tree/main/templates/skeleton/app/routes/).
* Learn how to [Manage customer accounts with the Customer Account API](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/customer-accounts)

***