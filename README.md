# 🛍️ ShopSphere

> A modern, responsive e-commerce web application focused on providing a clean, premium and user-friendly shopping experience.

## 🌐 Live Demo

https://shop-sphere-mbqcok929-mohdshavez-khan.vercel.app/

---

## 📌 About The Project

ShopSphere is a full-stack e-commerce application designed with a modern and responsive user interface.

The application allows users to browse products, explore categories, add products to their cart, manage quantities, place orders, and manage their account.

The project focuses on:

- Clean and premium UI
- Responsive design
- Smooth shopping experience
- User authentication
- Product management
- Cart management
- Order management
- Admin functionality

---

## ✨ Features

### 🏠 Home Page

- Premium hero section
- Call-to-action button
- Product/category discovery
- Responsive mobile layout
- Modern card-based design

### 🛍️ Product Browsing

- Browse available products
- Product images
- Product name
- Product price
- Product ratings
- Category-based browsing
- Add to Cart functionality

### 🗂️ Categories

Products can be explored through different categories such as:

- Fashion
- Electronics
- Shoes
- Watches
- Beauty
- Home & other product categories

### 🛒 Shopping Cart

- Add products to cart
- Increase/decrease product quantity
- Remove individual products
- Clear entire cart
- Persistent cart state
- Cart item count

### 👤 User Account

- User registration
- User login
- User logout
- Profile section
- My Orders section
- Protected user functionality

### 📦 Orders

- Order creation
- Order history
- View order details
- Order status management

### 🔐 Admin Functionality

Admin functionality includes:

- Protected admin routes
- View all orders
- View individual order details
- Update order status
- User/product/order management functionality

Supported order statuses include:

- Pending
- Shipped
- Delivered
- Cancelled

### 📱 Responsive Design

ShopSphere is designed to work across:

- Desktop
- Tablet
- Mobile

The mobile interface includes a dedicated navigation drawer with:

- Search
- Home
- Products
- Cart
- Profile
- My Orders
- Logout

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Responsive UI

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- JWT-based authentication
- Protected routes

### Deployment

- Vercel

---

## 🏗️ Application Architecture

```text
ShopSphere/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       │   ├── admin/
│       │   └── user/
│       ├── utils/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── App.js
│   └── Schema.js
│
├── .gitignore
└── README.md
