---
title: Function APIs
description: >-
  Shopify Functions allow developers to customize the backend logic that powers
  parts of Shopify, building functionality that's not provided natively or
  through other Shopify APIs.
api_version: 2026-01
api_type: functions
api_name: latest
source_url:
  html: 'https://shopify.dev/docs/api/functions/latest'
  md: 'https://shopify.dev/docs/api/functions/latest.md'
---

# Function APIs

[Shopify Functions](https://shopify.dev/docs/api/functions/current) enable you to customize Shopify's backend logic by running custom code during the checkout process. You can create functions to implement specialized features that aren't available natively.

For example, you can generate custom delivery options, create new types of discounts, and provide your own validation of a cart and checkout.

When you build a function, prioritize performance. Functions run in the context of key purchase flows, like discounts and checkout. Delays can negatively impact the Shopify backend and prevent customers from making purchases.

## Shopify CLI scaffold

Function APIs require a set of essential files, such as TOML configuration, GraphQL schema, GraphQL input query, and function code.

Use [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) to scaffold the essential elements that you need to get started.

## Generate scaffold

```terminal
shopify app generate extension
```

***

## Function execution order in checkout

When building Shopify Functions, you need to understand where they fit into the checkout process. Functions execute in a specific sequence during checkout, and each function depends on data from earlier steps. This sequencing is important because:

* Your function's input data comes from previous checkout operations.
* The logic of your function might change, depending on where it's executed during the checkout process.
* Understanding this flow helps you build more reliable and efficient functions.

For example, when a customer adds items to their cart and proceeds to checkout, several functions might run in sequence:

First, functions that change the pricing and presentation of items in a cart run. Then, functions that calculate discounts execute. Finally, functions that validate the cart contents run.

Each step builds on the data from previous steps, so that a cart validation function can't run until after discount calculations are complete.

Use this diagram to help you understand when each function runs during checkout, and plan your function's implementation accordingly.

1. **Cart lines**
   1. [Cart Transform](https://shopify.dev/docs/api/functions/latest/cart-transform)

2. **Cart line discounts**
   1. [Discount](https://shopify.dev/docs/api/functions/latest/discount)

3. **Fulfillment groups**

   1. [Fulfillment Constraints](https://shopify.dev/docs/api/functions/latest/fulfillment-constraints)
   2. [Order Routing](https://shopify.dev/docs/api/functions/latest/order-routing-location-rule)

4. **Delivery methods**

   1. [Pickup Point Delivery Option Generator](https://shopify.dev/docs/api/functions/unstable/pickup-point-delivery-option-generator)
   2. [Local Pickup Delivery Option Generator](https://shopify.dev/docs/api/functions/unstable/local-pickup-delivery-option-generator)
   3. [Delivery Customization](https://shopify.dev/docs/api/functions/latest/delivery-customization)

5. **Delivery discounts**
   1. [Discount](https://shopify.dev/docs/api/functions/latest/discount)

6. **Payment methods**
   1. [Payment Customization](https://shopify.dev/docs/api/functions/latest/payment-customization)

7. **Verification**
   1. [Cart and Checkout Validation](https://shopify.dev/docs/api/functions/latest/cart-and-checkout-validation)

***

## Function extension target types

Identifiers that specify where you're injecting code into Shopify. Targets define where functions run during the commerce loop.

* **Fetch target (limited)**

  * Input
  * Function module
  * Output
  * Shopify network
  * HTTPS call
  * External service

* **Run target**

  * Input
  * Function module
  * Output

##### Fetch target limited access

Limited access

The fetch target is limited to custom apps installed on Enterprise stores. You'll also need to [request network access for Functions](https://shopify.dev/docs/apps/build/functions/network-access), as it's not currently available on development stores or in a developer preview. However, there are exceptions for some Function APIs. For information on fetch target access for a specific API, refer to that Function's API reference page.

A mechanism for retrieving the data from a third party provider and passing the data to the run target.

Shopify calls the fetch target before the run target. Shopify makes the HTTP call on your behalf, which makes the fetch results available to the run target. This ensures that the run target has access to data from an external source.

Returning a network request is optional if it's not necessary for a specific function execution.

##### Run target

An extension point that enables you to customize Shopify's backend with custom business logic.

For example, you can prioritize locations for order routing, or create a new type of discount that's applied to a product or product variant in the cart.

The run target uses either Shopify data, hardcoded values, or fetch results from external providers.

## shopify.extension.toml

```toml
[[extensions.targeting]]
target = "<target_name>.fetch"
input_query = "src/fetch.graphql"
export = "fetch"
```

## shopify.extension.toml

```toml
[[extensions.targeting]]
target = "<target_name>.run"
input_query = "src/run.graphql"
export = "run"
```

***

## Function anatomy

When you create a function, you write a GraphQL input query that defines the shape of your data. Then you write logic that transforms the input data and returns the output to Shopify.

Shopify Functions query input data from the schema of a Function API. The output is also defined by the same Function API schema.

You can write functions in any language that can compile to WebAssembly (Wasm), although Rust is recommended and strongly preferred. Refer to the [WebAssembly API](https://shopify.dev/docs/apps/build/functions/programming-languages/webassembly-for-functions) for details.

* **Function extension target**

  * Input
  * Function module
  * Output
  * Shopify backend logic

### Input

The `Input` object is the complete GraphQL schema that your function can receive as input. You can specify what input your function needs using an input query. Before calling your target, Shopify runs its associated GraphQL query and passes the resulting JSON data to your target.

You can specify what input your function needs using an input query. When you create a function, the Shopify CLI generates a GraphQL file your input query. You can edit the query to request the data you need. In `run.graphql` you can edit the query to request the data you need. The structure of the JSON input in `input.json` then matches the shape of that query.

You can customize input queries using [metafields](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries) or [input variables](https://shopify.dev/docs/apps/build/functions/input-queries/use-variables-input-queries). Each [target](#function-extension-target-types) that your function extension implements can have a unique input query.

## Input structure

GraphQL

##### run.graphql

```graphql
query {
  cart {
    cart_field {
      property
    }
  }
}
```

##### input.json

```json
{
  "cart": {
    "cart_field": {
      "property": "bar"
    }
  }
}
```

### Function

The logic that processes your input data to generate a standardized response. It transforms your data into an ordered list of operations.

Each operation specifies the action to take based on your function's purpose. Shopify processes your response to present the results, such as available cart line discounts, during the commerce flow.

Shopify strongly recommends [Rust](https://shopify.dev/docs/apps/build/functions/programming-languages/rust-for-functions) as the most performant language choice to avoid your function failing with large carts.

## Function structure

##### Rust

```rust
fn main() {
    println!("Hello, world!");
}
```

##### Javascript

```javascript
//@param {input}
//@returns {FunctionRunResult} or {functionFetchResult}

export function run(input) {
    //function logic
    return { };
}
```

### Output

When your function runs, it returns an object that Shopify uses to perform one or more operations. Each Function API [extension target](https://shopify.dev/docs/apps/build/app-extensions/configure-app-extensions#targets) specifies the shape of the function's output using a GraphQL type. Function output is a declarative object which represents operations for Shopify to execute.

Function APIs produce different output operations as a result of a function run. Each Function API reference provides information on available targets, and their associated output GraphQL type.

## Output structure

JSON

```json
{
  "operations": [
    {
      "operations_field": {
        "field": "value"
      }
    }
  ]
}
```

***

## Configuration

Functions rely on a `shopify.extension.toml` file that contains the extension's configuration. This includes the extension name, type, API version, UI paths, build configuration, and metafields for query variables.

The `name` value is what displays in the Shopify admin to merchants, so consider this value carefully. We recommend that the `api_version` reflects the latest supported API version.

### Properties

Functions use [common configuration properties](https://shopify.dev/docs/apps/build/app-extensions/configure-app-extensions#common-properties) for app extensions. Additionally, the following properties in `shopify.extension.toml` are specific to Shopify Functions extensions:

##### `[[extensions.targeting]]` required

The name of the array that contains a target and its associated [WebAssembly](https://shopify.dev/docs/apps/build/functions/programming-languages/webassembly-for-functions) module export. Contains the following properties:

* `target`: required

  An identifier that specifies where you're injecting code into the Shopify backend.

* `input_query`: optional

  The path to the [input query](https://shopify.dev/docs/api/functions/2026-01#input) file for the target. If omitted, then the function receives no input.

* `export`: optional

  The name of the [WebAssembly](https://shopify.dev/docs/apps/build/functions/programming-languages/webassembly-for-functions) export in your module that executes the target.

  Functions don't use the `extensions.targeting.module` setting. Use `export` instead. Defaults to `_start`.

##### `[extensions.build]` optional

The settings related to the build and deployment of the function extension's WebAssembly module. Contains the following properties:

* `command`: required

  The command to build the function, which is invoked by the Shopify CLI build command. This setting can be omitted for JavaScript.

* `path`: optional

  The relative path to the function's [WebAssembly](https://shopify.dev/docs/apps/build/functions/programming-languages/webassembly-for-functions) module. For example, `build/my-module.wasm`. Defaults to `dist/index.wasm`.

* `watch`: optional

  The relative paths that Shopify CLI should watch when the dev command is invoked. Changes to matched files will trigger a build of the function and update it in your application drafts. This setting accepts a single file path or glob pattern, or an array of file paths and glob patterns.

  For JavaScript and TypeScript functions, this setting defaults to `['src/**/*.js', 'src/**/*.ts']`.

  Only paths inside the function directory are allowed. Don't use `../` (no parent directory references).

  [Input queries](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries) are automatically included in watch paths and don't need to be configured in `build.watch`.

* `wasm_opt`: optional

  Whether to optimize your module before upload. Defaults to `true`.

##### `[extensions.ui]` optional

The settings related to the [merchant interface](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#creating-your-merchant-interface) for your function. Contains the following properties:

* `handle`: optional

  The handle of another UI extension in your app that serves as the Shopify admin for merchants to configure that function. Learn how to create your [function's merchant interface](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#creating-your-merchant-interface).

* `enable_create`: optional

  Whether the function displays in the Shopify admin to merchants to create workflows. Learn how to [configure creation workflows for function owners](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#configuring-creation-workflows-for-function-owners).

##### `[extensions.ui.paths]` optional

The settings related to the App Bridge paths of the [merchant interface](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#creating-your-merchant-interface) for your function. Contains the following properties:

* `create`: optional

  The path within your app that's launched when a merchant clicks on creating a new customization with this function. Learn how to create your [function's merchant interface](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#creating-your-merchant-interface).

* `details`: optional

  The edit path that launches when a merchant clicks customization. Learn how to create your [function's merchant interface](https://shopify.dev/docs/apps/build/functions/input-queries/metafields-for-input-queries#creating-your-merchant-interface).

##### `[extensions.input.variables]` optional

The [variables to use in your input query](https://shopify.dev/docs/apps/build/functions/input-queries/use-variables-input-queries). A means of inserting the dynamic values in the input query if you use `hasTags` and `hasCollections`. Contains the following properties:

* `namespace`: optional

  A container for a group of metafields. Grouping metafields within a namespace prevents your metafields from conflicting with other metafields with the same key name.

* `key`: optional

  The name for the metafield.

## shopify.extension.toml

```toml
api_version = "2026-01"


[[extensions]]
name = "t:name"
handle = "my-discount-function"
type = "function"
uid = "aad83b55-634c-f168-7ece-00d492c84058ddd4a6b4"


  [[extensions.targeting]]
  target = "cart.lines.discounts.generate.run"
  input_query = "src/run.graphql"
  export = "run"


  [extensions.build]
  command = "cargo build --target=wasm32-unknown-unknown --release"
  path = "target/wasm32-unknown-unknown/release/discount.wasm"
  watch = [ "src/**/*.rs" ]


  # note: mutually exclusive to extension.ui.paths
  [extensions.ui]
  enable_create = true
  handle = "ui-extension-handle"


  # note: mutually exclusive to extension.ui
  [extensions.ui.paths]
  create = "/discount/function-handle/new"
  details = "/discount/function-handle/:id"


  [extensions.input.variables]
  namespace = "my-namespace"
  key = "my-key"
```

***

## Graph​QL schema and versioning

Each Function API has a GraphQL schema representation, which you can use to improve your development workflow. For example, a GraphQL schema can be used with tools like the [VS Code GraphQL plugin](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) and language-specific code generation tools, such as [`graphql_client`](https://github.com/graphql-rust/graphql-client) for Rust.

On creation, each function includes a copy of the GraphQL schema in the `schema.graphql` file. We recommend that your function always uses the latest supported schema version.

### Versioning

Function APIs are [versioned](https://shopify.dev/docs/api/usage/versioning). Updates are released quarterly, and you can find details about changes in the [developer changelog](https://shopify.dev/changelog).

Your function will be configured for the latest version when:

* You update the version of the API specified in your [configuration file](#configuration).
* [You generate the latest schema](#generating-the-latest-schema).
* If you're using JavaScript, you've regenerated types based on your input query.

## Update API version in shopify.extension.toml

```toml
api_version = "<api-version-in-configuration-file>"
```

## Generate latest schema

```bash
shopify app function schema
```

## Regenerate types (JavaScript-based functions only)

```bash
shopify app function typegen
```

### Generating the latest schema

If you're using an `2026-01` API version, then the GraphQL schema might have changed since you created the function or last generated the schema. If you change your target API version, then the Function API schema might have changed between versions.

To generate the latest GraphQL schema for your function, use the [`function schema` command](https://shopify.dev/docs/api/shopify-cli/app/app-function-schema). This command outputs the latest schema based on your function's API type and version to the `schema.graphql` file.

You can output the generated GraphQL schema to `STDOUT` by passing the `--stdout` flag, or save the output to a different file or pipe it into a code generation tool, if needed.

## Generate latest schema

```bash
shopify app function schema
```

## Output latest schema to STDOUT

```bash
shopify app function schema --stdout
```

## Output latest schema to custom file

```bash
shopify app function schema --stdout > <FILE_PATH>
```

***

## API availability

**All plans**: Except as noted in individual API pages, stores on any plan can use public apps that are distributed through the Shopify App Store and contain functions.

**Shopify Plus**: Only stores on a [Shopify Plus plan](https://help.shopify.com/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan) can use [custom apps](https://help.shopify.com/manual/apps/app-types/custom-apps) that contain Shopify Function APIs.

***

## Limitations

Your function must adhere to our resource limits. Performance is critical because functions run in the context of key purchase flows like discounts and checkout. Slow or resource-intensive functions can negatively impact the customer experience and potentially prevent customers from completing their purchases.

We strongly recommend that you use [Rust](https://shopify.dev/docs/apps/build/functions/programming-languages/rust-for-functions) as the most performant language choice. Rust's memory safety and zero-cost abstractions help ensure your function runs efficiently and stays within resource limits, even when processing large carts or complex business logic.

The following apply to all functions:

* Apps can reference only their own functions in GraphQL Admin API mutations, such as [`discountAutomaticAppCreate`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/discountAutomaticAppCreate) and [`cartTransformCreate`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/cartTransformCreate). Referencing a function from another app results in a `Function not found` error.
* Shopify doesn't allow nondeterminism in functions, which means that you can't use any randomizing or clock functionality in your functions.
* You can't debug your function by printing out `STDOUT` or `STDERR`.
* The Shopify App Store doesn't permit apps that provide dynamic editing and execution of function code.
* Some functions support network access, refer to [network access](https://shopify.dev/docs/apps/build/functions/network-access) for more information. You can also pre-populate data by using metafields on products and customers, or passing data using cart attributes.

### Fixed limits

The following resource limits apply to all functions:

| Resource | Limit |
| - | - |
| Compiled binary size | 256 kB |
| Runtime linear memory | 10,000 kB |
| Runtime stack memory | 512 kB |
| Logs written | 1 kB (truncated) |

Note

Function resource limits treat 1 kilobyte (kB) as 1000 bytes.

### Dynamic limits

Certain limits are dynamic and scale based on the number of line items in a cart. For carts with more than 200 line items, these values will scale proportionally as the number of cart lines increases. Calculated limits for a function execution are available in your [Dev Dashboard](https://dev.shopify.com/dashboard/) and can be [tested with Shopify CLI](https://shopify.dev/docs/apps/build/functions/test-debug-functions#execute-the-function-locally-using-shopify-cli).

The following resource limits apply to all functions for carts with up to 200 line items:

| Resource | Limit (up to 200 line items) |
| - | - |
| Execution [instruction count](https://webassembly.github.io/spec/core/syntax/instructions.html) | 11 million instructions |
| Function input | 128 kB |
| Function output | 20 kB This limit doesn't support bulk price transformations across all line items. Use [discount functions](https://shopify.dev/docs/api/functions/latest/discount), [B2B catalogs](https://shopify.dev/docs/apps/build/b2b/manage-catalogs), or target specific products instead. |

Note

Function resource limits treat 1 kilobyte (kB) as 1000 bytes.

### Input query limits

The following limitations apply to input queries:

* The maximum size for an input query, excluding comments, is 3000 bytes.

* Metafields with values exceeding 10,000 bytes in size will not be returned.

* Field arguments and input query variables of [list](https://graphql.org/learn/schema/#lists-and-non-null) type can't exceed 100 elements.

* Function input queries can have a maximum calculated query cost of 30. The following table describes the input query field costs for functions:

  | Field | Example | Cost value |
  | - | - | - |
  | `__typename` | | 0 |
  | Any field that returns a `Metafield` object | `metafield` on a `Product` object | 3 |
  | Any field on a `Metafield` object | `value` | 0 |
  | `hasAnyTag` | | 3 |
  | `hasTags` | | 3 |
  | Any field on a `HasTagResponse` object | `hasTag` | 0 |
  | `inAnyCollection` | | 3 |
  | `inCollections` | | 3 |
  | Any field on a `CollectionMembership` object | `isMember` | 0 |
  | Other leaf nodes | `id` or `sku` on a `ProductVariant` object | 1 |

***