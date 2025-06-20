# 🛍️ Product Management API

A RESTful API built with **Express.js** and **MongoDB** for managing products. This project is part of the **Week 2 Express.js Assignment** for the PLP Program.

## 🚀 Features

- CRUD operations for products
- Middleware for logging, validation, and authentication
- MongoDB integration using Mongoose
- Pagination, filtering, and search
- Product statistics by category
- Error handling and custom error classes

## 🧾 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Postman (for API testing)

---

## 📦 Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Stephen-179.git
cd product-api
Install dependencies:

bash
Copy code
pnpm install
Start MongoDB (locally or using a MongoDB Atlas URI).

Run the server:

bash
Copy code
pnpm run dev
Server will start on: http://localhost:3000

🔐 Authentication
All requests must include a valid API key in the headers:

vbnet
Copy code
x-api-key: my-secret-key
You can change the key in middleware/auth.js or via .env.

📘 API Endpoints
📍 Base URL
bash
Copy code
/api/products
➕ POST /
Create a new product

📥 GET /
Get all products with optional query parameters:

category: filter by category

inStock: true or false

page: page number (default: 1)

limit: items per page (default: 5)

🔍 GET /search?name=keyword
Search products by name (case-insensitive)

📊 GET /stats
Get stats grouped by category:

total count

average price

number in stock

🆔 GET /:id
Get a product by ID

✏️ PUT /:id
Update a product by ID

❌ DELETE /:id
Delete a product by ID

📁 Folder Structure
pgsql
Copy code
.
├── middleware/
│   ├── auth.js
│   ├── logger.js
│   ├── validateProduct.js
│   └── errorHandler.js
├── routes/
│   └── products.js
├── utils/
│   └── errors.js
├── Products.js
├── server.js
├── package.json
└── README.md
📬 Example Request
http
Copy code
POST /api/products
x-api-key: my-secret-key
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "description": "Ergonomic design",
  "price": 25,
  "category": "accessories",
  "inStock": true
}


🧑‍💻 Author
Stephen Mwatsaka
MERN Stack Developer | PLP Participant

