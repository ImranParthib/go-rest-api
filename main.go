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

// Sample data with actual products
var products = []Product{
	Product{
		ID:          "1",
		Name:        "Apple iPhone 14 Pro",
		Price:       999,
		Image:       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg",
		Description: "6.1-inch Super Retina XDR display with ProMotion and Always-On, A16 Bionic chip",
	},
	Product{
		ID:          "2",
		Name:        "Samsung Galaxy S23 Ultra",
		Price:       1199,
		Image:       "https://images.samsung.com/is/image/samsung/assets/us/smartphones/galaxy-s23/images/galaxy-s23-share-image.jpg",
		Description: "6.8-inch Dynamic AMOLED 2X display, 200MP camera, S Pen included",
	},
	Product{
		ID:          "3",
		Name:        "MacBook Pro M2",
		Price:       1999,
		Image:       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg",
		Description: "14-inch Liquid Retina XDR display, M2 Pro chip, up to 18 hours battery life",
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

	// CORS middleware
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// Apply middleware
	handler := corsHandler(r)

	fmt.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
