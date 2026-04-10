# LUXE E-commerce - Premium Fullstack Platform

This project is a high-end, premium e-commerce platform built with React (Vite) and Laravel.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, Context API.
- **Backend**: Laravel 11/12, Sanctum Auth, SQLite (default).

## Project Structure
- `/frontend`: React application.
- `/backend`: Laravel API.

## Setup Instructions

### Backend (Laravel)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Copy the environment file and generate the key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```
5. Start the Laravel server:
   ```bash
   php artisan serve
   ```
   *The API will be available at `http://localhost:8000/api`*

### Frontend (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`*

## Features
- **Modern UI**: Apple & Stripe inspired design with Glassmorphism.
- **Responsive**: Mobile-first design for all pages.
- **Authentication**: Fully integrated with Laravel Sanctum.
- **Shopping Cart**: Persistent cart using LocalStorage and Context API.
- **Product Filters**: Search, category filtering, and price sorting.
- **Wishlist**: Save favorite products (requires login).
- **Checkout**: Seamless multi-step checkout UI.
- **User Dashboard**: Track orders and manage profile.

## API Documentation
- `POST /api/register` - Create account
- `POST /api/login` - Login
- `POST /api/logout` - Logout (auth required)
- `GET /api/products` - List products (filters: category, search, sort)
- `GET /api/products/{slug}` - Product details
- `GET /api/categories` - List categories
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `POST /api/orders` - Place order
- `POST /api/wishlist/toggle` - Toggle wishlist item
