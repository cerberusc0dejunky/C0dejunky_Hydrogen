---
title: Hydrogen React
description: >
  Hydrogen React is a performant, framework-agnostic library of React
  components, reusable functions, and utilities for interacting with Shopify’s
  [Storefront API](/docs/api/storefront). It’s bundled with
  [Hydrogen](/docs/api/hydrogen), but can be used by any React-based web app.
api_version: 2025-07
api_name: hydrogen-react
source_url:
  html: 'https://shopify.dev/docs/api/hydrogen-react/latest'
  md: 'https://shopify.dev/docs/api/hydrogen-react/latest.md'
---

# Hydrogen React

Hydrogen React is a performant, framework-agnostic library of React components, reusable functions, and utilities for interacting with Shopify’s [Storefront API](https://shopify.dev/docs/api/storefront). It’s bundled with [Hydrogen](https://shopify.dev/docs/api/hydrogen), but can be used by any React-based web app.

## Setup

1. Install Hydrogen React in your project with your preferred package manager.
2. Import components, hooks, or utilities that you want to use in your app. For more detailed instructions, see the Getting Started guide.

[Tutorial - Getting Started with Hydrogen React](https://shopify.dev/docs/custom-storefronts/hydrogen-react)

## Install the Hydrogen React package

##### npm

```text
npm i --save @shopify/hydrogen-react
```

##### yarn

```text
yarn add @shopify/hydrogen-react
```

***

## Authentication

To use Hydrogen React, you need to authenticate with and make requests to the [Storefront API](https://shopify.dev/docs/api/storefront). Hydrogen React includes an [API client](https://shopify.dev/docs/api/hydrogen-react/2025-07/utilities/createstorefrontclient) to securely handle API queries and mutations.

You can create and manage Storefront API access tokens by installing the [Headless sales channel](https://apps.shopify.com/headless) on your store.

Apps have access to [two kinds of tokens](https://shopify.dev/docs/api/usage/authentication#access-tokens-for-the-storefront-api): a public API token, which can be used in client-side code, and a private API token, which should only be used in server-side contexts and never exposed publicly.

[Install - Headless sales channel](https://apps.shopify.com/headless)

## Authenticate a Hydrogen app

##### client.js

```javascript
import {createStorefrontClient} from '@shopify/hydrogen-react';

export const client = createStorefrontClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN,
});
```

##### .env

```text
# Replace with your own store domain and Storefront API token

PUBLIC_STOREFRONT_API_TOKEN="public_token"
PRIVATE_STOREFRONT_API_TOKEN="private_token"
PUBLIC_STORE_DOMAIN="store_id.myshopify.com"
```

##### server-side-query.js

```javascript
import {client} from './client.js';

export async function getServerSideProps() {
  const response = await fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
    }),
    // Generate the headers using the private token.
    headers: client.getPrivateTokenHeaders(),
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  return {props: json};
}

const GRAPHQL_QUERY = `
  query {
    shop {
      name
    }
  }
`;
```

***

## Versioning

Hydrogen React is tied to specific versions of the [Storefront API](https://shopify.dev/docs/api/storefront), which is versioned quarterly. For example, if you're using Storefront API version `2023-10`, then Hydrogen versions `2023.10.x` are fully compatible.

Caution

If a Storefront API version includes breaking changes, then the corresponding Hydrogen React version will include the same breaking changes.

[Learn more - Shopify API versioning](https://shopify.dev/docs/api/usage/versioning)

[Learn more - API release notes](https://shopify.dev/docs/api/release-notes)

***

## Components

Components include all the business logic and data parsing required to produce predictable markup for objects available through the Storefront API. Components provide defaults but can be customized. Hydrogen React components include no visual styles, other than the ones provided natively by browsers.

## Component example

## Component

```javascript
import {ShopPayButton} from '@shopify/hydrogen-react';


export function MyProduct({variantId}) {
  return <ShopPayButton variantIds={[variantId]} />;
}
```

***

## Hooks

Hooks are functions that provide reusable business and/or state logic. They give you additional flexibility to control the behavior and display of Hydrogen React components.

## Hook example

## Hook

```javascript
import {useMoney} from '@shopify/hydrogen-react';


export function MyComponent({variant}) {
  const {currencyCode, currencySymbol, amount} = useMoney(variant.pricev2);


  return (
    <div>
      <strong>{currencyCode}</strong>
      <span>{currencySymbol}</span>
      <span>{amount}</span>
    </div>
  );
}
```

***

## Utilities

Utilities are reusable functions for common manipulations performed on data returned from the Storefront API.

## Utility example

## Utility

```javascript
import {flattenConnection, MediaFile} from '@shopify/hydrogen-react';


export function Product({product}) {
  const media = flattenConnection(product.media);
  return (
    <>
      {media.map((mediaFile) => {
        return <MediaFile data={mediaFile} key={mediaFile.id} />;
      })}
    </>
  );
}
```

***

## How Hydrogen React works with Hydrogen

Hydrogen React is bundled as part of Hydrogen, Shopify’s opinionated headless commerce stack built on [Remix](https://remix.run). Hydrogen React is also published separately as a standalone package so that it can be used by other React-based frameworks.

Hydrogen adds features like standard routes, caching strategies, redirects, and SEO. When using Hydrogen, you can also install the Hydrogen sales channel, which includes built-in support for Oxygen, Shopify’s global edge hosting platform. Consider which approach works best for your use case and existing technology stack.

[Learn more - Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen)

[Install - Hydrogen sales channel](https://apps.shopify.com/hydrogen)

***

## Resources

[Custom storefronts on Shopify\
\
](https://shopify.dev/custom-storefronts)

[Learn more about how to design, build, and manage custom storefronts on Shopify.](https://shopify.dev/custom-storefronts)

[Hydrogen on GitHub\
\
](https://github.com/Shopify/hydrogen)

[Follow the Hydrogen project, file bugs and feature requests, preview upcoming features, and more.](https://github.com/Shopify/hydrogen)

***---
title: Bring your own headless stack
description: >-
  Learn about integrating Shopify’s composable commerce APIs into the
  frameworks, hosting, and workflows that work best for you.
source_url:
  html: 'https://shopify.dev/docs/storefronts/headless/bring-your-own-stack'
  md: 'https://shopify.dev/docs/storefronts/headless/bring-your-own-stack.md'
---

# Bring your own headless stack

![Flow chart of a headless architecture built on Shopify. A developer uses the Shopify admin to control access to the Storefront API and Customer Account API. Those API resources are then rendered to display to customers.](https://shopify.dev/assets/assets/images/custom-storefronts/headless/headless-channel-DvaOH6om.png)

Shopify’s composable commerce APIs allow you to integrate Shopify into nearly any technology stack, so you have the freedom to use the frameworks, hosting, and workflows that work best for you.

***

## Install the Headless channel

To start accessing the Storefront API and the Customer Account API, you need to install the [Headless channel](https://apps.shopify.com/headless) from the Shopify App Store.

This channel gives you a single place to manage API access for all your client applications. It enables you to publish products to the Headless sales channel, as well as manage API permissions and credentials.

Info

If you want to display products on an existing site or platform, you can skip installing the Headless channel and use [Storefont Web Components](https://shopify.dev/docs/api/storefront-web-components) instead.

***

## Create a storefront

You can create multiple storefronts in the Headless channel.

Each storefront has its own set of API tokens, but all storefronts in the Headless channel share the same API permissions.

1. From your Shopify admin, under **Sales channels**, click **Headless**.
2. Click **Add storefront**.
3. (Optional) On the storefront detail page, click **Rename** to edit the storefront’s default name.

***

## Manage API permissions

You can control which store data is available through the Storefront or Customer Account APIs. All storefronts in the Headless channel share the same API permissions.

1. From your Shopify admin, under **Sales channels**, click **Headless**.
2. Click the name of the storefront that you want to update.
3. Under **Manage API access**, click **Manage** for the API that you want to update.
4. Under **Permissions**, click the edit icon.
5. Check the permission scopes that you want enabled.
6. Click **Save**.

***

## Rotate API credentials

For security purposes, you can update your API credentials at any time.

1. From your Shopify admin, under **Sales channels**, click **Headless**.
2. Click the name of the storefront to update.
3. Under **Manage API access**, click **Manage** for the API that you want to update.
4. Under **Rotate credentials**, click **Generate new token**. Both the old and new credentials are valid until you delete the old credentials.
5. Update your client apps with the new credentials.

* The Storefront API access relies on an API token.
* The Customer Account API might have a Client ID and a Client Secret, depending on the type of access.

1. After you’ve updated your apps, delete the old credentials by clicking **Revoke**.

***

## Configure routes

The standard format for product URLs is `/products/:handle`. If your storefront uses a different structure, then it's recommended that you provide a server-side redirect (3XX) from the expected `/products/:handle` path to the product page.

It's also recommended that your storefront supports [cart permalinks](https://help.shopify.com/en/manual/checkout-settings/cart-permalink). [View example implementation](https://github.com/Shopify/hydrogen-demo-store/blob/b19212adc431c9ee3c510f022ee994bb5d24b0df/app/routes/\(%24locale\).cart.%24lines.tsx)

***

## Delete a storefront

Deleting a storefront in the Headless channel revokes all its access tokens. You need to update any clients using those tokens.

1. From your Shopify admin, under **Sales channels**, click **Headless**.
2. Click the name of the storefront that you want to delete.
3. Click **Delete storefront**.
4. To confirm, click **Delete storefront**.

***

## Next steps

From here, what you build is up to you! The Storefront API and the Customer Account API provide a wide selection of commerce primitives that enable you to integrate Shopify into your existing tech stack, or create something new.

* Learn more about [getting started with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api).
* Learn more about [getting started with the Customer Account API](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api).
* Learn more about [headless with B2B](https://shopify.dev/docs/storefronts/headless/bring-your-own-stack/b2b).
* Consult the complete [Storefront API Reference](https://shopify.dev/docs/api/storefront).
* Consult the complete [Customer Account API Reference](https://shopify.dev/docs/api/customer).

***