# E-Commerce API Backend

A scalable RESTful E-Commerce backend built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Swagger UI Express
- bcrypt
- Multer
- Winston

---

# Features

The project provides APIs for:

- User Authentication
- Product Management
- Cart Management
- Orders
- Likes
- Product Ratings
- File Uploads
- API Documentation
- MongoDB Aggregation
- Transactions

---

# Authentication & Authorization

- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes
- User Signup & Signin
- Reset Password

---

# Product Management

- Add Products
- Get All Products
- Get Single Product
- Filter Products
- Product Ratings
- Category Management
- Product Reviews

---

# Cart Management

- Add to Cart
- Get Cart Items
- Remove Cart Items

---

# Order Management

- Place Orders
- MongoDB Transactions
- Automatic Stock Reduction
- Cart Cleanup after Order

---

# Like System

- Like Products
- Like Categories
- Dynamic References using `refPath`

---

# Additional Features

- Swagger API Documentation
- File Uploads using Multer
- Logging using Winston
- MongoDB Aggregation Pipelines
- MongoDB Indexing
- Environment Variable Configuration
- Error Handling Middleware
- CORS Configuration

---

# Project Structure

```bash
project-root/
│
├── src/
│   ├── config/
│   ├── error-handler/
│   ├── features/
│   │   ├── user/
│   │   ├── product/
│   │   ├── cartitems/
│   │   ├── order/
│   │   ├── like/
│   ├── middlewares/
│
├── uploads/
├── swagger.json
├── server.js
├── package.json
├── .env
```

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Backend Runtime |
| Express.js | API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Security |
| Multer | File Upload |
| Swagger UI Express | API Documentation |
| Winston | Logging |

---

# API Documentation

Swagger documentation available at:

```bash
https://e-commerce-web-di08.onrender.com/api-docs/#/
```

---

# Main API Endpoints

## User APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/users/signup` | Register User |
| POST | `/api/users/signin` | Login User |
| PUT | `/api/users/resetPassword` | Reset Password |

---

## Product APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Get All Products |
| GET | `/api/products/:id` | Get Single Product |
| POST | `/api/products` | Add Product |
| POST | `/api/products/rate/:productId` | Rate Product |
| GET | `/api/products/filter` | Filter Products |
| GET | `/api/products/averagePrice` | Average Product Price |

---

## Cart APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/cartItems` | Add Cart Item |
| GET | `/api/cartItems` | Get Cart Items |
| DELETE | `/api/cartItems/:id` | Remove Cart Item |

---

## Order APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/orders` | Place Order |

---

## Like APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/likes` | Like Product/Category |
| GET | `/api/likes` | Get Likes |

---

# MongoDB Concepts Used

- Aggregation Pipeline
- `$lookup`
- `$group`
- `$match`
- `$unwind`
- `$push`
- `$pull`
- `$inc`
- Transactions
- Indexes
- Dynamic References
- Population
- Middleware Hooks

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Environment Variables
- Request Validation
- CORS Policy

---

# Deployment

This project is deployed on:

```bash
https://e-commerce-web-di08.onrender.com/
```

---
