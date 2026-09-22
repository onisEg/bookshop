# 📚 Bookshop — Online Bookstore

An e-commerce bookstore built with **React + TypeScript**: browse books by category, filter and sort the catalogue, add books to a cart and pay with a card through **Stripe**.

**🔗 Live demo:** https://bookshop-git-main-onisegs-projects.vercel.app/

<!-- Add a screenshot: save it as public/screenshot.png and uncomment the line below -->
<!-- ![Bookshop screenshot](public/screenshot.png) -->

## Features

- **Authentication** — register, login, forgot / reset / change password, with JWT stored on the client and protected routes.
- **Home page** — hero slider, category carousel, featured books, deal of the week with a live countdown, new releases and latest articles (Swiper).
- **Books catalogue** — filter by category and price range, sort (A–Z, price ↑/↓), choose items per page and paginate. Categories can be pre-selected from the URL (`?category=`).
- **Book details** page.
- **Cart** — add/remove items and update quantities, synced with the backend basket API.
- **Checkout** — card payment with Stripe Elements, then an order confirmation page.
- **Responsive** — layout adapts to phone, tablet and desktop (filters collapse on small screens).
- Form validation with React Hook Form and toast notifications.

## Tech stack

| | |
|---|---|
| Framework | React 18, TypeScript, Vite |
| UI | Material UI, Bootstrap 5, Swiper |
| Routing | React Router 6 |
| State | React Context (auth & cart) |
| Forms | React Hook Form |
| Payments | Stripe (`@stripe/react-stripe-js`) |
| HTTP | Axios |
| Deploy | Vercel |

The REST API (books, categories, basket, orders, auth) was provided by the Upskilling training program.

## Project structure

```
src/
├── modules/
│   ├── AuthModule/        # login, register, password flows
│   ├── HomeModule/        # home sections, book details, about
│   ├── ListingPageModel/  # catalogue: filters, grid, pagination
│   ├── CartModule/        # cart, payment, confirmation
│   └── Shared/            # layouts, navbar, footer, protected route
├── Context/               # AuthContext, CartContext
└── constants/             # API endpoints, types, validations
```

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
```

## Author

**Anas Alnagar** — Frontend Developer, Barcelona  
[Portfolio](https://www.anascv.com/) · [LinkedIn](https://www.linkedin.com/in/anaseg/) · [GitHub](https://github.com/onisEg)
