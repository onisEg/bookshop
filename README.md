# Book Shop

Book Shop is a React and TypeScript storefront where signed-in readers browse books, manage a basket and submit an order. The frontend uses an external bookstore API for catalogue, account, basket and order data. Stripe Elements handles card entry.

[Live demo](https://bookshop-git-main-onisegs-projects.vercel.app/) · [Source code](https://github.com/onisEg/bookshop)

## From browsing to confirmation

1. Open the site and sign in, or create an account. The root route shows the login form. The storefront lives under the protected `/dashbord` layout.
2. Open **Books**, filter the catalogue, browse the result pages and select a book to see its details.
3. Add the book to the basket. In the cart, adjust its quantity or remove it. The cart provider submits these changes to the bookstore API.
4. During checkout, enter test payment details and complete the shipping address. The payment form obtains a card token from Stripe and sends it to the order endpoint with the basket ID and delivery data.
5. After a successful order response, the app passes the order ID and total to the confirmation screen through router state and fetches the basket again.

## Run locally

Use a recent Node.js LTS release and npm. Start from a fresh checkout:

```sh
git clone https://github.com/onisEg/bookshop.git
cd bookshop
npm ci
npm run dev
```

Open the URL Vite prints. To check a production build, run `npm run build` followed by `npm run preview`. The build runs TypeScript before bundling into `dist/`. The repository also provides `npm run lint` for static analysis.

## Navigation

| Screen | Path |
| --- | --- |
| Login and registration | `/`, `/login`, `/register` |
| Password recovery, reset and change | `/forgetpass`, `/resetpssword`, `/changePass` |
| Storefront home and catalogue | `/dashbord/home`, `/dashbord/books` |
| Book details | `/dashbord/book/:bookId` |
| Basket and order confirmation | `/dashbord/cart`, `/dashbord/confirmation` |

The route spellings above match the implementation. For a static deployment, configure a fallback to `index.html` so opening a nested URL directly reaches React Router.

## Basket and API behaviour

The active cart screen reads **React CartContext**. The provider owns the basket ID, basket items and operations used by the cart UI. The repository also contains a Redux store with counter and theme reducers. To trace a basket change, start at the cart provider mounted in `src/main.tsx`.

| Operation | API request | Frontend behaviour |
| --- | --- | --- |
| Load basket | `GET /basket` | Reads the current account’s basket. |
| Add a book | `POST /basket/item` | Submits the item and reloads the basket on success. |
| Change quantity or remove an item | `PUT /basket/{cartId}` | Submits the updated item list for the basket. |
| Place order | `POST /order/{cartId}` | Sends the Stripe token and delivery address, then reads the returned order ID and total. |

The base URL and endpoint definitions are in `src/constants/END_POINTS.ts`. Its Axios interceptor adds the bearer token from local storage and sets JSON and English-language headers. Running the frontend locally still requires access to the external API.

## Code guide

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Browser routes, protected storefront layout and Stripe Elements. |
| `src/main.tsx` | Mounts the authentication and basket providers. |
| `src/Context/CartContext.tsx` | Loads catalogue data and manages basket requests. |
| `src/modules/ListingPageModel/` | Product grid, filters and pagination. |
| `src/modules/HomeModule/Components/BookDetails/` | Individual book view. |
| `src/modules/CartModule/Components/` | Basket details, payment submission and order confirmation. |

Several files have a duplicate `-AnasMacBook` suffix. Follow the imports from `main.tsx` and `App.tsx` to identify the modules used in the build.

## Checkout details and limits

The order request uses the country, city, state and phone returned by the address element. The implementation supplies fixed sample values for several other delivery fields, including street, building, floor and coordinates. Treat delivery as a demonstration flow. The confirmation screen receives the order details through navigation state, so use the successful checkout path when reviewing it.

## Verification

Reviewed revision `099f145`. The production build passed with a bundle-size warning. ESLint reported 121 errors and two warnings. The following are manual acceptance checks:

- [ ] Sign in and open a book from the catalogue. Compare the selected title with its details page.
- [ ] Add a book, update its quantity and reopen the basket. Check the displayed quantity against the basket response.
- [ ] Remove the book, reload the basket and confirm the returned item list.
- [ ] In a payment test environment, place a test order and compare the displayed order ID and total with the API response.

An end-to-end payment was not performed during this review.

## Account lifecycle

The account forms use React Hook Form and call the external API with Axios. The login response supplies `data.accessToken` inside the response body. The client stores it under `token` in browser local storage and decodes it into AuthContext. On a fresh page load the provider restores the decoded claims. The storefront guard admits a visitor if either the stored token or the in-memory login data exists. An anonymous visitor opening a protected URL returns to the login screen. Authorization of individual API requests depends on the backend.

| User action | POST endpoint | Form fields | Destination on success |
| --- | --- | --- | --- |
| Register | `/auth/register` | `first_name`, `last_name`, `email`, `password`, `role` | Login at `/` |
| Sign in | `/auth/login` | `email`, `password` | `/dashbord/home` |
| Request recovery | `/auth/forgot-password` | `email` | `/resetpssword` |
| Reset with a code | `/auth/reset-password` | `email`, `otp`, `password` | `/login` |
| Change password | `/auth/change-password` | `password`, `password_new` | `/dashbord/home` |

Registration offers the literal role values `Customer` and `user`. The shared registration rules accept names of 3–50 characters. The password pattern requires an uppercase letter, a lowercase letter, a digit and a symbol from `@$!%*?&`. The account forms use direct Axios calls. Only requests made with the shared API instance receive its bearer-token interceptor automatically.

## Storefront and catalogue

The default child at `/dashbord` renders the same home component as `/dashbord/home`. The home screen combines a hero, category carousel, new releases, featured books, deals, newsletter section and articles. The About screen lives at `/dashbord/about`.

| Step | What the application does |
| --- | --- |
| Load | On mount, CartContext makes separate category requests for its category and book collections, plus a basket request. These can start on the login page because the provider wraps the router. |
| Map | The catalogue reads `GET /category`. It keeps categories containing books and flattens their nested arrays. Each book gets its parent category ID, an `id` from `_id`, and an author from `author` or the fallback spelling `auther`. |
| Assign artwork | The catalogue cycles through the local cover array by index within each category. A repeated cover can represent two different books. Category artwork has its own image array. |
| Select | Opening `/dashbord/books?category=<category-id>` seeds the category selection. Selecting multiple categories includes a book if any selected category matches. Price bounds are inclusive. |
| Sort and page | Title A–Z is the default. Both price directions are available. Pages contain 12 items initially, with 8 and 24 as alternatives. Filtering, sorting and slicing happen in the browser. |
| Open details | Visiting `/dashbord/book/:bookId` fetches `GET /book/{bookId}` separately. The component reads the returned book object directly and maps its `_id` to `id`. |

Changing page size returns to page one. Changing filters keeps the current page number. If narrowing a search on a later page leaves the grid empty, return to page one. Clearing filters removes selected category IDs and price bounds while preserving sort order and page size.

## Basket data and totals

Three identifiers appear in this flow. The catalogue's `product.id` identifies a book, a basket row references that same book in `item.book`, and the basket response's own `_id` identifies the basket for updates and checkout. The cart screen joins rows to catalogue books by book ID to recover names and unit prices.

Adding one copy sends this body to `POST /basket/item`. IDs below are illustrative.

```json
{"book": "book-a", "quantity": 1}
```

Changing a quantity submits the complete remaining basket to `PUT /basket/{cartId}`. For example, changing the first book to two copies while keeping the second sends:

```json
{"items": [{"book": "book-a", "quantity": "2"}, {"book": "book-b", "quantity": "1"}]}
```

Removal uses the same operation after the user confirms the dialog. It omits the removed row and sends an empty array when the last row is removed. The provider accepts the update when HTTP status is 200 and the response body reports `SUCCESS`. The add path instead reloads the basket after HTTP 200.

The displayed subtotal sums catalogue price × basket quantity for each matched row. An unmatched book contributes nothing. The shopping summary adds a fixed $10 shipping fee and 5% of the subtotal for VAT. Two $20 books therefore show a $40 subtotal, $2 tax and $52 total. The confirmation page displays the total returned by the order API, which can differ from the cart estimate.

## Checkout request lifecycle

1. Stripe Elements mounts the card field and the shipping address field under the test publishable key configured in `src/App.tsx`. Use Stripe test payment details when exercising this demo.
2. Submission reads the address element and asks Stripe to tokenize the card. A tokenization error is shown in a toast. An incomplete address also produces a toast and stops order creation.
3. The frontend posts `token` and `delivery_address` to `/order/{cartId}`. The user supplies country, city, state and phone. The payload maps phone to `mobile` and fills `street`, `building`, `floor`, `appartment`, `additional_info` and the location coordinates with sample values.
4. The handler reads `data._id` and `data.total` from the response body and navigates with those two values. Direct entry into the confirmation URL has no order navigation state. An order request failure is logged to the console and keeps the user on checkout.

## Configuration and deployment

| Setting | Current implementation |
| --- | --- |
| API origin and prefix | `https://upskilling-egypt.com:3007/api`, configured in `src/constants/END_POINTS.ts` |
| Payment mode | Stripe test publishable key in `src/App.tsx` |
| Frontend stack | React 18, TypeScript, Vite 5 and React Router 6. Material UI and Bootstrap supply UI and layout styles. Swiper drives carousels. |
| Build and output | Install with `npm ci`, build with `npm run build`, publish `dist/`. |
| Browser routing | Configure the static host to serve `index.html` for application routes while serving bundled assets normally. Check a direct visit to `/login` and a signed-in refresh at `/dashbord/books`. |

The repository supplies the browser application. A local Vite server still calls the configured remote backend and Stripe. Pointing the project at a different backend requires updating both the shared Axios base URL and the endpoint constants in the same module. Account forms call the endpoint constants directly.

## Troubleshooting and review scenarios

| Symptom | What to inspect |
| --- | --- |
| A signed-out visit to Books lands at login | This is the route guard. Start at `/`, sign in and navigate to Books. For a fresh-session test, use a private browser window. |
| A login screen shows a basket error | Inspect the initial `GET /basket` and whether the request carried a token. The cart provider mounts before sign-in. |
| Categories appear but a book detail keeps loading | Inspect the separate `GET /book/{bookId}` request. On failure the component shows an error toast and can continue displaying its loading indicator. |
| The cart total seems too low | Compare basket row IDs with the catalogue. A missing catalogue match excludes that row from the subtotal. |
| A cart quantity update leaves a spinner | Inspect the PUT response. The quantity handler sets loading before validation and clears it on its success path. A rejected update can leave it set. |
| Checkout does not open confirmation | Check that Stripe loaded, the address is complete and the order request succeeded. Inspect the browser console for a rejected order. |
| Only refreshed nested links return a host 404 | Check the host fallback by opening `/login` directly. This exercises browser routing without requiring an account. |

For a repeatable acceptance pass, record the book ID, initial quantity, cart estimate and returned order total. Exercise a cold visit, a category link, a later page narrowed by a filter, quantity changes, cancelled and confirmed removal, and a direct confirmation visit. Checkout requires a test account and working remote integrations. The available package scripts include lint and build checks but no automated test command.
