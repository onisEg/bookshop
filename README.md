# Book Shop

An online bookstore with a catalogue, book details, a shared shopping basket and a checkout screen built with Stripe Elements.

[Open the live demo](https://bookshop-git-main-onisegs-projects.vercel.app/) · [View screenshot](https://raw.githubusercontent.com/onisEg/resume/23df91e50f87b60e1360d79edcc24cf77eb09b07/public/projects/bookshop.webp)

## From a book to a basket

1. Open a book from the listing. Filters and pagination live alongside the product grid. The add-to-cart control connects the selected book to the shared basket.
2. The cart screen consumes CartContext. Adding a book, removing an item or changing its quantity is handled by that provider. The repository also includes Redux slices for the counter and theme.
3. At checkout the payment component obtains a token from Stripe and uses the order response to navigate to confirmation. Basket and order operations require the configured backend.

## Reading the repository

Some files have a duplicate `-AnasMacBook` suffix. Start from the imports in `src/main.tsx` and `src/App.tsx` to follow the modules loaded by the application.

## Run locally

Use Node.js 22.12 or later and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To build the distributable files in `dist/`, run `npm run build`. To serve that build locally, run `npm run preview`.

## Source guide

| File or directory | What to look for |
| --- | --- |
| [src/main.tsx](src/main.tsx) | Mounts the auth and cart providers. |
| [src/Context/CartContext.tsx](src/Context/CartContext.tsx) | Basket operations, quantities and fetching the current basket. |
| [src/modules/ListingPageModel](src/modules/ListingPageModel) | Product grid, filters and pagination. |
| [src/modules/CartModule](src/modules/CartModule) | Cart details, payment and confirmation screens. |
| [src/constants/END_POINTS.ts](src/constants/END_POINTS.ts) | Backend endpoints used by the client. |

## Manual walkthrough

Select a book, add it to the basket and change its quantity. Compare the visible basket with the response when it reloads. For payment testing, use the service’s test configuration. A rendered payment form alone does not confirm an order.
