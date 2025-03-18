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
	ID          string `json:"id"`
	Name        string `json:"name"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

// Sample data
var products = []Product{
	Product{
		ID:          "1",
		Name:        "Product 1",
		Price:       100,
		Image:       "https://via.placeholder.com/150",
		Description: "This is product 1",
	},
	Product{
		ID:          "2",
		Name:        "Product 2",
		Price:       200,
		Image:       "https://via.placeholder.com/150",
		Description: "This is product 2",
	},
	Product{
		ID:          "3",
		Name:        "Product 3",
		Price:       300,
		Image:       "https://via.placeholder.com/150",
		Description: "This is product 3",
	},
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
