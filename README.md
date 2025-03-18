# Clothing Shop - Go REST API with Admin Panel

A full-stack clothing shop application with a Go backend API and React/Remax frontend.

## 📂 Project Structure

```
clothing-shop/
├── backend/         # Go API server
│   └── main.go      # Server implementation
├── frontend/        # React/Remax frontend
│   ├── public/      # Static files
│   └── src/         # React components
│       ├── pages/   # Frontend pages
│       │   ├── index/  # Shop display
│       │   └── admin/  # Admin panel
│       └── app.tsx  # App root
└── go.mod           # Go modules file
```

## 🚀 Getting Started

Follow these steps to set up and run this project locally.

### Prerequisites
Make sure you have **Go** installed. You can check by running:
```sh
go version
```
If Go is not installed, download and install it from [golang.org](https://go.dev/dl/).

You'll also need **Node.js** for the frontend. Check with:
```sh
node -v
```
If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/).

---

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/clothing-shop.git
cd clothing-shop
```

---

### 2️⃣ Setup the Backend
```sh
# Install Go dependencies
go get -u github.com/gorilla/mux

# Run the backend server
cd backend
go run main.go
```
The server will start on port 8080.

---

### 3️⃣ Setup the Frontend
```sh
cd frontend
npm install
npm run dev
```
The frontend will be available at http://localhost:3000.

---

### 4️⃣ Accessing the Admin Panel
Navigate to http://localhost:3000/pages/admin/index to access the admin panel where you can manage clothing products.

---

## 🛍️ Features

### Shop Frontend
- Browse all clothing items
- Filter products by category
- View product details including price, size, and color

### Admin Panel
- Add new clothing items
- Edit existing products
- Delete products
- Select categories, sizes and colors
- Preview product images

---

## 📝 API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update an existing product
- `DELETE /api/products/{id}` - Delete a product

---

## 📜 License
This project is licensed under the MIT License.

---

Happy shopping! 👕👖👚

