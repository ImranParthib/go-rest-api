# Go REST API

A simple REST API built with Go using `gorilla/mux`.

## 🚀 Getting Started

Follow these steps to set up and run this project locally.

### Prerequisites
Make sure you have **Go** installed. You can check by running:
```sh
 go version
```
If Go is not installed, download and install it from [golang.org](https://go.dev/dl/).

---

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/go-rest-api.git
cd go-rest-api
```

---

### 2️⃣ Initialize the Go Module
```sh
go mod init github.com/your-username/go-rest-api
```
_(Replace `your-username` with your GitHub username.)_

---

### 3️⃣ Install Dependencies
```sh
go get -u github.com/gorilla/mux
```

---

### 4️⃣ Create a `main.go` File
Create a `main.go` file and add the following code:

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Product struct
type Product struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

// Sample data
var products = []Product{
	{ID: "1", Name: "Aarong Dairy Sour Curd", Price: 120},
	{ID: "2", Name: "Aarong Dairy Sweetened Yogurt", Price: 150},
}

// Get all products
func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func main() {
	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/api/products", getProducts).Methods("GET")

	fmt.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
```

---

### 5️⃣ Run the API Server
Start the server with:
```sh
go run main.go
```
You should see:
```
Server running on port 8080...
```

---

### 6️⃣ Test the API
Open your browser or use Postman to visit:
```
http://localhost:8080/api/products
```
You should see the product list as JSON! 🎉

---

## 📌 Pushing to GitHub
If you haven't already, push the project to GitHub:
```sh
git init
git add .
git commit -m "Initial commit - Go REST API"
git branch -M main
git remote add origin https://github.com/your-username/go-rest-api.git
git push -u origin main
```
_(Replace `your-username` with your GitHub username.)_

---

## 🎯 Next Steps
✅ Add CRUD operations (Create, Update, Delete)  
✅ Connect to a database (PostgreSQL, MySQL, MongoDB)  
✅ Implement authentication (JWT, OAuth)  

---

## 📜 License
This project is licensed under the MIT License.

---

Happy coding! 🚀

