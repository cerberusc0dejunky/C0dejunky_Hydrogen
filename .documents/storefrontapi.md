---
title: Building with the Storefront API
description: >-
  Learn how the Storefront API equips you to build customized shopping
  experiences by connecting you to Shopify's powerful commerce tools on the
  backend.
source_url:
  html: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api
  md: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api.md
---

# Building with the Storefront API

The Storefront API is the foundational layer of custom storefronts. It provides you the commerce primitives to build custom, scalable, and performant shopping experiences

***

## What is the Storefront API?

The Storefront API provides access to Shopify's primitives and capabilities such as displaying products and collections, adding items to the cart, calculating contextual pricing, and more.

You can use the Storefront API to build unique commerce experiences on any platform, including the web, native apps, games, and social media, using the frontend tools of your choice.

![The Storefront API's function as layer between Shopify's backend and its commerce primitives, and customer touchpoints such as mobile, social media, and web](https://shopify.dev/assets/assets/images/custom-storefronts/storefront-api/how-does-sfapi-work-C9V36b8L.png)

***

## When to use the Storefront API

The Storefront API helps you create a seamless and engaging shopping experience for your customers by leveraging the robust commerce functionality of Shopify. Headless builds are made efficient and performant with the following resources:

* **Built-in commerce essentials**: Leverage the full power of the Shopify admin to manage your back-office products like pricing, inventory, and metafields. Use the Storefront API to deliver performant buyer experiences with optimized cart, contextual pricing, subscriptions, and more.

* **Operate at a global scale**: Backed by the infrastructure that supports over 2 million Shopify businesses, build your custom storefront on the platform that's fast, flexible, and feature-rich.

* **Build your way**: Bring your own tech stack, requirements, and experience. Build on top of Shopify's proven Storefront API that serves 1M+ queries per minute.

* [**Developer tools**](#developer-tools): Improve your developer experience by helping you learn about the API.

  Because the Storefront API uses the Shopify backend, you can focus on building a unique and customized shopping experience with strong brand representation. You can create custom pages, themes, and order management experiences that are fully integrated with a storefront.

***

## API versioning

The Storefront API is [versioned](https://shopify.dev/docs/api/usage/versioning), with new releases four times a year. We strongly recommend updating your apps to make requests to the latest stable API version every quarter. However, if your app uses a stable version that is no longer supported, then Shopify falls forward and responds to your request with the same behavior as the oldest supported stable version.

***

## Authentication and authorization

The Storefront API supports both tokenless access and token-based authentication.

### Tokenless access

Tokenless access allows API queries without an access token providing access to essential features such as:

* Products and Collections

* Selling Plans

* Search

* Pages, Blogs, and Articles

* Cart (read/write)

  Tokenless access has a query complexity limit of 1,000. Query complexity is calculated based on the cost of each field in the query.

### Token-based authentication

For access to all Storefront API features, an access token is required. The following features require token-based authentication:

* Product Tags

* Metaobjects and Metafields

* Menu (Online Store navigation)

* Customers

  The Storefront API has the following types of token-based access:

  **Public Authentication**: The public token is used for client side queries and mutations. As every buyer has a different IP, the token scales to support large amounts of traffic.

  **Private Access**: The private token provides authenticated access to the Storefront API and is used for server-side queries and mutations.

Caution

Unlike public access tokens, private access tokens should be treated as secret and not used on the client-side. We recommend only requesting the scopes that your app needs, to reduce the security risk if the token leaks.

Learn more about [authentication](https://shopify.dev/docs/api/usage/authentication).

***

## What is the Headless channel?

Make headless and self-hosted Hydrogen experiences possible in the Headless channel without needing to create a custom app.

The Headless channel provides a single place to create and manage access tokens for the [Storefront API](https://shopify.dev/docs/api/storefront). You can use the channel to create multiple custom storefronts. Storefronts that you create through the channel automatically include public and private access tokens with shop permission for the Storefront API. In the channel, you can rotate your private access token and manage storefront permissions.

Additionally, the channel gives you all of Shopify's channel features, such as product publishing and order attribution, and analytics and reporting sales by channel.

Order attribution is at the channel level, and a Headless storefront is treated as a channel.

![An image of a developer installing the Headless channel. The channel provides public and private access tokens, options to manage storefront permissions, and tools for order attribution. Requests to the API for storefront data can be made from public and private contexts. The data is sent to the storefront, which serves data and passes back data such as what is used for attributing orders to the channel](https://shopify.dev/assets/assets/images/custom-storefronts/storefront-api/headless-channel-b70XV1OD.png)

[Get started with the Headless channel](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started).

***

## Reference

[Storefront API reference\
\
](https://shopify.dev/docs/api/storefront)

[Consult the Storefront API reference for available objects, queries, and mutations.](https://shopify.dev/docs/api/storefront)

***

## Developer tools

Shopify provides tools to help you learn how to use the Storefront API.

[Storefront API GraphiQL explorer\
\
](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/api-exploration/graphiql-storefront-api)

[Use the interactive GraphiQL explorer for the Storefront API on a demo shop.](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/api-exploration/graphiql-storefront-api)

[Storefront API learning kit\
\
](https://github.com/Shopify/storefront-api-learning-kit)

[A downloadable package of a complete set of sample GraphQL queries to the Storefront API](https://github.com/Shopify/storefront-api-learning-kit)

***

## Limitations

* You can have a maximum of 100 active storefronts and access tokens per shop.

***

## Next steps

* [Get started](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) building headless with the Storefront API and start querying data.

***---
title: Create and update a cart with the Storefront API
description: Learn how to create and update a cart in Shopify with the Storefront API.
source_url:
  html: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage
  md: >-
    https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage.md
---

# Create and update a cart with the Storefront API

A cart contains the merchandise that a customer intends to purchase, and the estimated cost associated with the cart. You can use the [Storefront API](https://shopify.dev/docs/api/storefront) to interact with a cart during a customer's session.

This guide shows how to create a cart and retrieve it, update cart line items and customer information, and retrieve a checkout URL.

***

## Requirements

* You've completed the [Getting started with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) guide.

- You've created [products](https://shopify.dev/docs/api/admin-graphql/latest/objects/product) and [product variants](https://shopify.dev/docs/api/admin-graphql/latest/objects/productvariant) in your store.
- You're using version 2022-10 or higher of the Storefront API. To [set metafields on a cart](#step-4-set-metafields-on-a-cart), you need to use version 2023-04 or higher of the Storefront API.

***

## Cart object relationships

Before you start building a cart, we recommend familiarizing yourself with the following API objects and their relationships:

![A diagram showing the cart object and its relationships](https://shopify.dev/assets/assets/images/apps/cart-api-objects-DVVAcpWw.png)

| Object | Description |
| - | - |
| [Cart](https://shopify.dev/docs/api/storefront/latest/objects/Cart) | An object that contains the merchandise that a customer intends to purchase. |
| [CartBuyerIdentity](https://shopify.dev/docs/api/storefront/latest/objects/CartBuyerIdentity) | Identifies the customer that is interacting with the cart. It includes a customer access token that associates the customer with the cart, and a set of preferences that can be used to prefill a checkout session. |
| [Cost](https://shopify.dev/docs/api/storefront/latest/objects/CartCost) | The estimated costs that the customer will pay at checkout. The costs are subject to change and changes display at checkout. Merchants can configure the prices of products on a per country basis in their Shopify admin. The prices that display on a storefront are determined in the following ways:- **Checkout pricing**: The final sale price. `CartBuyerIdentity` is used to determine [international pricing](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/international-pricing#step-2-create-a-cart) and should match the customer's shipping address.
- **Cart pricing**: The estimated final sale price. `CartCost` uses `CartBuyerIdentity` to determine [international pricing](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/international-pricing#step-2-create-a-cart).
- **Product queries**: The price that displays on a product page. Products use the `@inContext` directive to determine [international pricing](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/international-pricing#step-2-create-a-cart). |
| [Attribute](https://shopify.dev/docs/api/storefront/latest/objects/Attribute) | An array of custom information for a cart line. Attributes are returned as key-value pairs. |
| [CartLine](https://shopify.dev/docs/api/storefront/latest/objects/CartLine) | A list of line item objects, each containing information about an item in the cart. |
| [Merchandise](https://shopify.dev/docs/api/storefront/latest/unions/Merchandise) | A product variant. It represents one version of a product with several options. |

***

## Cart ID

The cart ID consists of a token and a secret key parameter in the form of `<token>?key=<secret>`. When you work with any Cart API, you must always provide the full ID.

Example: `gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890`

Caution

Shopify may change the format and length of cart tokens at any time. Apps must be built to handle cart tokens of any format.

The key serves as a verification mechanism for the cart builder, ensuring the protection of the buyer's private data. If you do not include the secret key during a query, the buyer's private details (such as email or address) will be removed from the cart response. Additionally, if you attempt to modify the cart through a mutation without a key, the mutation will fail with an error message indicating the cart does not exist.

Caution

Never expose the `secret` part of the ID. Treat it like a password—don't include it in shareable links, public pages, or any client-side code.

***

## Step 1: Create a cart and add a line item

You can use the [`cartCreate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate) mutation to create a new cart and add a line item to the cart. In the input, include the line item quantity (`quantity`) and the product variant ID (`merchandiseId`), and specify any attributes (`attributes`) associated with the cart.

If your storefront has context about the buyer that's interacting with the cart (`buyerIdentity`), then you can also define delivery address preferences (`deliveryAddressPreferences`), or preferred delivery method (`deliveryMethod`) in the mutation's input. Preferences are fields that Shopify can use to accelerate and personalize the checkout process, and best optimize conversions.

Note

To use pick-up points as a delivery method preference, a `buyerIdentity.countryCode` is required to ensure the buyer's country matches with the pick-up point country

In the response, request the added line item's ID, merchandise, attributes, address, and other preferences to verify that all information was added correctly. You can also request information about the costs associated with the cart:

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL mutation

```graphql
mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "gid://shopify/ProductVariant/1"
        }
      ],
      # The information about the buyer that's interacting with the cart.
      buyerIdentity: {
        email: "example@example.com",
        countryCode: CA,
        # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
        deliveryAddressPreferences: {
          # One-time use address isn't saved to the customer account after checkout
          oneTimeUse: false,
          deliveryAddress: {
            address1: "150 Elgin Street",
            address2: "8th Floor",
            city: "Ottawa",
            province: "Ontario",
            country: "CA",
            zip: "K2P 1L4"
          },
        },
        preferences: {
          delivery: {
            deliveryMethod: PICK_UP
          }
        },
      }
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute"
      }
    }
  ) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
        preferences {
          delivery {
            deliveryMethod
          }
        }
      }
      attributes {
        key
        value
      }
      # The estimated total cost of all merchandise that the customer will pay at checkout.
      cost {
        totalAmount {
          amount
          currencyCode
        }
        # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
        subtotalAmount {
          amount
          currencyCode
        }
        # The estimated tax amount for the customer to pay at checkout.
        totalTaxAmount {
          amount
          currencyCode
        }
        # The estimated duty amount for the customer to pay at checkout.
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cartCreate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "createdAt": "2021-06-11T14:46:44Z",
        "updatedAt": "2021-06-11T14:46:44Z",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/1",
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/1"
                }
              }
            }
          ]
        },
        "buyerIdentity": {
          "deliveryAddressPreferences": [
            {
              "__typename": "MailingAddress"
            }
          ],
          "preferences": {
            "delivery": {
              "deliveryMethod": [
                "PICK_UP"
              ]
            }
          }
        },
        "attributes": [
          {
            "key": "cart_attribute",
            "value": "This is a cart attribute"
          }
        ],
        "cost": {
          "total": {
            "amount": 67.07,
            "currencyCode": "CAD"
          },
          "subtotal": {
            "amount": 59.99,
            "currencyCode": "CAD"
          },
          "totalTax": {
            "amount": 7.02,
            "currencyCode": "CAD"
          },
          "totalDuty": {
            "amount": 0.00,
            "currencyCode": "CAD"
          }
        }
      }
    }
  }
}
```

***

## Step 2: Retrieve a cart

You can use the [`cart`](https://shopify.dev/docs/api/storefront/latest/queries/cart) query to retrieve a cart stored on Shopify. In the query, supply the cart ID as your input.

The following example shows how to retrieve a cart by its ID:

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL query

```graphql
query {
  cart(
    id: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
  ) {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
      preferences {
        delivery {
          deliveryMethod
        }
      }
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cart": {
      "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
      "createdAt": "2021-06-11T14:46:44Z",
      "updatedAt": "2021-06-11T14:46:44Z",
      "lines": {
        "edges": [
          {
            "node": {
              "id": "gid://shopify/CartLine/1",
              "quantity": 1,
              "merchandise": {
                "id": "gid://shopify/ProductVariant/1"
              },
              "attributes": [
                {
                  "key": "engraving",
                  "value": "This is an engraving"
                }
              ]
            }
          }
        ]
      },
      "attributes": [
        {
          "key": "cart_attribute",
          "value": "This is a cart attribute"
        }
      ],
      "cost": {
        "total": {
          "amount": 67.07,
          "currencyCode": "CAD"
        },
        "subtotal": {
          "amount": 59.99,
          "currencyCode": "CAD"
        },
        "totalTax": {
          "amount": 7.02,
          "currencyCode": "CAD"
        },
        "totalDuty": {
          "amount": 0.00,
          "currencyCode": "CAD"
        }
      },
      "buyerIdentity": {
        "email": "example@example.com",
        "phone": null,
        "customer": null,
        "countryCode": "CA",
        "deliveryAddressPreferences": [
          {
            "address1": "150 Elgin Street",
            "address2": "8th Floor",
            "city": "Ottawa",
            "provinceCode": "ON",
            "countryCodeV2": "CA",
            "zip": "K2P 1L4"
          }
        ],
        "preferences": {
          "delivery": {
            "deliveryMethod": [
              "PICK_UP"
            ]
          }
        }
      }
    }
  }
}
```

***

## Step 3: Increase an item's quantity

You can use the [`cartLinesUpdate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesUpdate) mutation to add another product variant of the same type to the cart.

In the mutation's input, include the cart ID, cart line ID, and the new quantity value that you want to set. In the response, request the ID and quantity of the line items to verify that it was updated correctly.

The following example shows how to increase a line item's quantity in a cart to three:

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL mutation

```graphql
mutation {
  cartLinesUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    lines: {
      id: "gid://shopify/CartLine/1"
      quantity: 3
    }
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cartLinesUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "lines": {
          "edges": [
            {
              "node": {
                "id": "gid://shopify/CartLine/1",
                "quantity": 3,
                "merchandise": {
                  "id": "gid://shopify/ProductVariant/1"
                }
              }
            }
          ]
        },
        "cost": {
          "total": {
            "amount": 201.03,
            "currencyCode": "CAD"
          },
          "subtotal": {
            "amount": 179.97,
            "currencyCode": "CAD"
          },
          "totalTax": {
            "amount": 21.06,
            "currencyCode": "CAD"
          },
          "totalDuty": {
            "amount": 0.00,
            "currencyCode": "CAD"
          }
        }
      }
    }
  }
}
```

***

## Step 4: Set metafields on a cart

[Metafields](https://shopify.dev/docs/apps/build/custom-data) are a flexible way for your app to add and store additional information about a cart. You can create metafields to extend the cart schema with custom values and logic at checkout. For example, you might want to attach custom structured metadata on a cart, and read it from a checkout extension to deliver a customized end-to-end buyer experience.

You can use the [`cartMetafieldsSet`](https://shopify.dev/docs/api/storefront/latest/mutations/cartMetafieldsSet) mutation to create and update metafields on a cart. In the mutation's input, supply the cart ID in the `ownerId` field, and define [the parts of the metafield](https://shopify.dev/docs/apps/build/custom-data#what-are-metafields).

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL mutation

```graphql
mutation {
  cartMetafieldsSet(
    metafields:[
      {
        ownerId: "gid://shopify/Cart/1",
        key: "public.materials",
        type: "multi_line_text_field",
        value: "95% Cotton\n5% Spandex"
      },
      {
        ownerId: "gid://shopify/Cart/1",
        key: "public.manufactured",
        type: "single_line_text_field",
        value: "Made in Canada"
      }
  ]) {
    metafields {
      namespace
      key
      value
      type
    }
    userErrors {
      code
      field
      message
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cartMetafieldsSet": {
      "metafields": [
        {
          "namespace": "public",
          "key": "materials",
          "type": "multi_line_text_field",
          "value": "95% Cotton\n5% Spandex"
        },
        {
          "namespace": "public",
          "key": "manufactured",
          "type": "single_line_text_field",
          "value": "Made in Canada"
        }
      ],
      "userErrors": []
    }
  }
}
```

***

## Step 5: Update customer information and customer preferences for guest checkout journeys

You can use the [`cartBuyerIdentityUpdate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartBuyerIdentityUpdate) mutation to associate customer information and their checkout preferences with the cart, such as a customer's email, phone number, country, preferred delivery method, and pickup location.

As of the `2025-01` release, `buyerIdentity.deliveryAddressPreferences` is deprecated. Cart delivery addresses can be managed with three new mutations:

* [`cartDeliveryAddressesAdd`](https://shopify.dev/docs/api/storefront/latest/mutations/cartDeliveryAddressesAdd)
* [`cartDeliveryAddressesUpdate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartDeliveryAddressesUpdate)
* [`cartDeliveryAddressesRemove`](https://shopify.dev/docs/api/storefront/latest/mutations/cartDeliveryAddressesRemove)

In the mutation's input, supply the cart ID and the `buyerIdentity` attributes related to the customer (for example, email, phone, and countryCode), along with any preferences for prefilling checkout like preferred delivery method or pickup location. In the response, request the same information to verify it was updated correctly.

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL mutation

```graphql
mutation {
  cartBuyerIdentityUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    buyerIdentity: {
      email: "example@example.com"
      phone: "800-555-0100"
      countryCode: CA,
      preferences: {
        delivery: {
          deliveryMethod: PICK_UP,
          pickupHandle: "93893525526"
        }
      }
    }
  ) {
    cart {
      id
      buyerIdentity {
        email
        phone
        countryCode
        preferences {
          delivery {
            deliveryMethod
            pickupHandle
          }
        }
      }
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cartBuyerIdentityUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "buyerIdentity": {
          "email": "example@example.com",
          "phone": "800-555-0100",
          "countryCode": "CA",
          "preferences": {
            "delivery": {
              "deliveryMethod": [
                "PICK_UP"
              ],
              "pickupHandle": "93893525526"
            }
          }
        }
      }
    }
  }
}
```

***

## Step 6: Authenticate customer for logged-in checkouts

You can authenticate the customer by setting a valid `customerAccessToken` in the [`cartBuyerIdentityUpdate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartBuyerIdentityUpdate) mutation or during cart creation. If you append the `customerAccessToken` to the cart, then the buyer will be logged in when they're redirected to checkout.

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL mutation

```graphql
mutation {
  cartBuyerIdentityUpdate(
    cartId: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890"
    buyerIdentity: {
      customerAccessToken: "1b024bde52fcce3c363d2e67f7a13958"
    }
  ) {
    cart {
      id
      buyerIdentity {
        customerAccessToken
      }
    }
  }
}
```

## JSON response

```json
{
  "data": {
    "cartBuyerIdentityUpdate": {
      "cart": {
        "id": "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890",
        "buyerIdentity": {
          "customerAccessToken": "1b024bde52fcce3c363d2e67f7a13958"
        }
      }
    }
  }
}
```

***

## Step 7: Retrieve a checkout URL

When the buyer is ready to complete checkout, you can query the [`Cart`](https://shopify.dev/docs/api/storefront/latest/queries/cart) object for the [`checkoutUrl`](https://shopify.dev/docs/api/storefront/latest/objects/Cart#field-checkouturl) by supplying the cart's ID as your input. The response includes a URL that redirects customers through Shopify's web checkout.

Note

When the customer access token is set on the cart, the obtained checkoutUrl allows the authenticated buyer to navigate to a logged-in checkout experience. For security reasons, the checkoutUrl should be requested when the buyer is ready to navigate to checkout and can be re-requested if it is stale.

To preserve the buyer's logged-in checkout experience, you must include the `Shopify-Storefront-Buyer-IP` header in your Storefront API call when making server side requests. For more information, refer to [Making server-side requests](https://shopify.dev/docs/api/usage/authentication#making-server-side-requests).

## POST https://{shop}.myshopify.com/api/{api\_version}/graphql.json

## GraphQL query

```graphql
query checkoutURL {
  cart(id: "gid://shopify/Cart/Z2NwLXVzLWV4YW1wbGU6MDEyMzQ1Njc4OTAxMjM0NTY3ODkw?key=examplekey1234567890") {
    checkoutUrl
  }
}
```

## JSON response

```json
{
  "data": {
    "cart": {
      "checkoutUrl": "https:\/\/exam.myshopify.com\/cart\/c\/29567c413f68cf5e8c1cb623954f3a28"
    }
  }
}
```

***

## Next steps

* Use the [`warnings` return field](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/cart-warnings) to manage automatic changes to your cart.
* Learn how [create a cart and a subscription line item](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/subscriptions#step-4-create-a-cart-and-a-subscription-line-item).
* Query [international prices](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/international-pricing) for products and orders, and explicitly set the context of a cart and checkout.
* [Manage customer accounts](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/customer-accounts) with the Storefront API.
* Learn about the [different tools](https://shopify.dev/docs/storefronts/headless/additional-sdks) that you can use to create unique buying experiences anywhere your customers are, including websites, apps, and video games.
* Use `@defer` to [fetch carrier-calculated rates](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/defer#fetching-carrier-calculated-rates-for-the-cart-using-defer) for the cart.

***---
title: Checkout Kit
description: Learn how you can build mobile shopping experiences with Checkout Kit.
source_url:
  html: 'https://shopify.dev/docs/storefronts/mobile/checkout-kit'
  md: 'https://shopify.dev/docs/storefronts/mobile/checkout-kit.md'
---

# Checkout Kit

Checkout Kit enables mobile app developers to provide the world's best-converting checkout experience with only a few lines of code. It provides a fully-featured checkout that preserves all store customizations and supports idiomatic app defaults, such as light and dark mode. This delivers the best mobile app experience that is crucial for driving conversion, being compliant, and creating loyal customers.

![CSK Purchase Flow](https://shopify.dev/assets/assets/images/custom-storefronts/checkout-sheet-kit/purchase-flow-csk-BWhMFIl_.png)

Info

We're in the process of renaming "Checkout Sheet Kit" to "Checkout Kit." The dev docs already use the new name, while code samples and open-source repos will be updated soon.

***

## How it works

The Checkout Kit is easy to implement and maintain with support for Swift, Kotlin, React Native, and Web. The entry point to a native checkout is a [cart permalink](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks) or a familiar [checkout URL](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage#step-7-retrieve-a-checkout-url) from the Cart API. The kit creates a bridge to web checkout, registers callbacks to monitor lifecycle events, preloads for an instant checkout, renders in an optimized sheet, and supports authenticated handoffs. The checkout itself preserves all store customizations and business logic, including checkout UI extensions, Shopify Functions, branding, and more. There is no need to build and maintain a separate checkout system, no trade-offs necessary. It is fully compatible for all merchants.

In order to present the checkout:

* Obtain a product ID from the [Storefront API](https://shopify.dev/docs/api/storefront/latest/queries/products).

* Assemble a cart and retrieve a [checkout URL](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage#step-7-retrieve-a-checkout-url) or create a [cart permalink](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks).

  Then let the kit do the work rendering your full-featured checkout sheet.

## How to present the checkout

##### iOS

```swift
import UIKit
import ShopifyCheckoutSheetKit

class MyViewController: UIViewController {
  func presentCheckout() {
    let checkoutURL: URL = // obtained from buyer's cart (Storefront API) or cart permalink
    ShopifyCheckoutSheetKit.present(checkout: checkoutURL, from: self, delegate: self)
  }
}
```

##### Android

```kotlin
import com.shopify.checkoutsheetkit.ShopifyCheckoutSheetKit

fun presentCheckout() {
    val checkoutUrl = cart.checkoutUrl
    ShopifyCheckoutSheetKit.present(checkoutUrl, context, checkoutEventProcessor)
}
```

##### React Native

```javascript
import {useShopifyCheckoutSheet} from '@shopify/checkout-sheet-kit';

function App() {
  const shopifyCheckout = useShopifyCheckoutSheet();
  const handleClick = () => {
    // Present the checkout
    shopifyCheckout.present(checkoutUrl);
  }
}
```

##### Web

```html
<script type="module" src="https://cdn.shopify.com/shopifycloud/checkout-web/component/unstable/kit.js"></script>
<shopify-checkout></shopify-checkout>
<a id="checkout-button" href="https://yourshop.myshopify.com/cart/12345:1">Checkout</a>
<script type="module">
  const checkout = document.querySelector("shopify-checkout");
  document.querySelector("#checkout-button").addEventListener("click", (e) => {
    e.preventDefault();
    checkout.src = e.target.href;
    checkout.open();
  });
</script>
```

***

## When to use it

There are two ways that Checkout Kit can be used, depending on the environment and need.

* For all merchant-branded mobile apps, including those with customized checkouts, use Checkout Kit. It also works for many search and discovery apps that facilitate purchases from merchants across the internet without being the merchant of record.
* For advanced use cases, select global partners can request to use Shopify’s Checkout Sheet Protocol, which is the underlying technology that powers Checkout Kit. The protocol unlocks custom checkout themes, feature configurations, and other bespoke capabilities, making it easier to meet certain data and branding specifications.

***

## Key features

* **Full-featured checkout**: Checkout Kit preserves all store customizations and business logic, including checkout UI extensions, Shopify Functions, branding, and more.
* **[Preload checkout](https://shopify.dev/docs/storefronts/mobile/checkout-kit/preloading):** Developers can deliver an instant checkout with advanced preloading for a seamless customer experience. Preloading is enabled by default and is as simple as calling `preload()` with a valid checkout URL.
* **[Monitor the lifecycle of a checkout session](https://shopify.dev/docs/storefronts/mobile/checkout-kit/monitor-checkout-lifecycle):** With Checkout Kit, app developers can register callbacks for key checkout lifecycle events such as failed or completed checkout events to monitor and log the status of a checkout session, in addition to integrating with pixel events to understand customer behavior.
* **[Authenticate checkouts and prefill buyer preferences](https://shopify.dev/docs/storefronts/mobile/checkout-kit/authenticate-checkouts):** Checkout experiences with known buyers reduce friction and increase conversion. Depending on the status of the customer (logged-in or guest), the app developer can authenticate the customer to checkout or prefill the buyer identity and delivery and payment preferences.
* **[Branding options](https://shopify.dev/docs/storefronts/mobile/checkout-kit/configuration):** Checkout Kit supports a buyer’s iOS or Android device settings. It dynamically adjusts to the device in use, can be hard-coded to light or dark mode, or can match the merchant's store branding.
* **[Accelerated checkouts](https://shopify.dev/docs/storefronts/mobile/checkout-kit/accelerated-checkouts):** Enable customers to complete purchases faster including accelerated checkout buttons on storefront product and cart pages.
* **[Privacy compliance](https://shopify.dev/docs/storefronts/mobile/checkout-kit/privacy-compliance):** Collect and pass visitor consent information for privacy-compliant checkout experiences. Support for analytics, preferences, marketing, and sale of data consent types ensures compliance with regulations like GDPR, CCPA, and Apple's App Tracking Transparency.

![CSK Branding Options](https://shopify.dev/assets/assets/images/custom-storefronts/checkout-sheet-kit/csk-branding-options-0G3j9Uza.png)

***

## Case studies

### Checkout Kit - Stikky

Learn how [Stikky](https://www.shopify.com/partners/blog/developer-spotlight-how-stikky-leverages-shopify-s-checkout-sheet-kit-to-uplevel-mobile-commerce), a mobile app developer for Shopify merchants, leveraged Checkout Kit and saw a 15% boost in conversion while reducing checkout-related logic by 75%.

### Checkout Sheet Protocol - Tik​Tok

Learn how [TikTok](https://www.youtube.com/watch?v=N53aWuIE--Q) integrated Checkout Sheet Protocol to create friction-free buying experiences, making it easier for TikTok users to discover, shop, and check out directly in the app.

***

## Repositories

Checkout Kit is available for Swift, Android, and React Native.

[Checkout Kit for Swift\
\
](https://github.com/Shopify/checkout-sheet-kit-swift)

[A Swift library for presenting the Shopify checkout experience.](https://github.com/Shopify/checkout-sheet-kit-swift)

[Checkout Kit for Android\
\
](https://github.com/Shopify/checkout-sheet-kit-android)

[An Android library for presenting the Shopify checkout experience.](https://github.com/Shopify/checkout-sheet-kit-android)

[Checkout Kit for React Native\
\
](https://github.com/Shopify/checkout-sheet-kit-react-native)

[A React Native module for presenting the Shopify checkout experience.](https://github.com/Shopify/checkout-sheet-kit-react-native)

Note

The checkout experience is powered using embedded Shopify web checkout. The library implements a native bridge and protocol that abstracts all of the embedding logic behind simple-to-use native APIs with additional capabilities to pre-fill buyer identity, optimize how the checkout is loaded, how it is presented, and more. Check out our blog to [learn how Checkout Kit is built](https://www.shopify.com/partners/blog/mobile-checkout-sdks-for-ios-and-android).

***

## Next steps

* Learn how to integrate Checkout Kit using [Swift](https://shopify.dev/docs/storefronts/mobile/checkout-kit/swift), [Android](https://shopify.dev/docs/storefronts/mobile/checkout-kit/android), or [React Native](https://shopify.dev/docs/storefronts/mobile/checkout-kit/react-native).

***