# Clothing Shop - Go REST API with Admin Panel

A full-stack clothing shop application with a Go backend API and React/Remix frontend with Tailwind CSS.

## 📂 Project Structure

```
clothing-shop/
├── backend/         # Go API server
│   └── main.go      # Server implementation
├── frontend/        # React/Remix frontend
│   ├── app/         # React components
│   │   ├── routes/  # Frontend routes
│   │   └── root.tsx # App root
│   ├── public/      # Static files
│   └── tailwind.config.js # Tailwind configuration
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

If you encounter any errors about 'remix' not being recognized, try installing the dependencies globally:
```sh
npm install -g @remix-run/dev @remix-run/serve
```

The frontend will be available at http://localhost:3000.

---

### 4️⃣ Accessing the Admin Panel
Navigate to http://localhost:3000/admin to access the admin panel where you can manage clothing products.

---

## 🛍️ Features

### Shop Frontend
- **Browse Products**: View all clothing items
- **Category Filtering**: Filter by product categories
- **Responsive Design**: Works on mobile and desktop with Tailwind CSS
- **Product Details**: View sizes, colors, prices and descriptions

### Admin Panel
- **Product Management**: Add, edit and delete clothing items
- **Image Preview**: Preview product images before saving
- **Validation**: Form validation for required fields
- **Category Selection**: Choose from predefined clothing categories
- **Size Options**: Select from standard clothing sizes

---

## 📝 API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update an existing product
- `DELETE /api/products/{id}` - Delete a product

---

## 🔧 Development

### Frontend Technology
The frontend uses:
- **Remix**: Modern React framework for better routing and server components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **TypeScript**: For type-safe development

### Build for Production

To build the frontend for production:
```sh
cd frontend
npm run build
```

This will generate production-ready files in the 'build' directory.

---

## 📜 License
This project is licensed under the MIT License.

---

Happy shopping! 👕👖👚

