package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Product struct
type Product struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Size        string `json:"size"`
	Color       string `json:"color"`
}

// Sample data with clothing products
var products = []Product{
	{
		ID:          "1",
		Name:        "Classic Cotton T-Shirt",
		Price:       29,
		Image:       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Soft and comfortable cotton t-shirt, perfect for everyday wear",
		Category:    "Tops",
		Size:        "M",
		Color:       "White",
	},
	{
		ID:          "2",
		Name:        "Slim Fit Jeans",
		Price:       59,
		Image:       "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Modern slim fit jeans with stretch for maximum comfort",
		Category:    "Bottoms",
		Size:        "32",
		Color:       "Blue",
	},
	{
		ID:          "3",
		Name:        "Wool Winter Coat",
		Price:       149,
		Image:       "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Premium wool blend coat to keep you warm during winter months",
		Category:    "Outerwear",
		Size:        "L",
		Color:       "Charcoal",
	},
	{
		ID:          "4",
		Name:        "Striped Oxford Shirt",
		Price:       45,
		Image:       "https://images.unsplash.com/photo-1598961942138-ba8d94b33d04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Classic button-down oxford shirt with blue and white stripes",
		Category:    "Tops",
		Size:        "M",
		Color:       "Blue/White",
	},
	{
		ID:          "5",
		Name:        "Linen Summer Dress",
		Price:       68,
		Image:       "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Light and breathable linen dress, perfect for summer days",
		Category:    "Dresses",
		Size:        "S",
		Color:       "Beige",
	},
	{
		ID:          "6",
		Name:        "Leather Ankle Boots",
		Price:       120,
		Image:       "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Durable leather boots with comfortable cushioned insole",
		Category:    "Footwear",
		Size:        "40",
		Color:       "Brown",
	},
	{
		ID:          "7",
		Name:        "Cashmere Sweater",
		Price:       95,
		Image:       "https://images.unsplash.com/photo-1576566588028-4147f3842717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Luxuriously soft cashmere sweater for ultimate comfort",
		Category:    "Tops",
		Size:        "L",
		Color:       "Navy",
	},
	{
		ID:          "8",
		Name:        "High-Waisted Yoga Leggings",
		Price:       49,
		Image:       "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Stretchy, moisture-wicking fabric perfect for yoga or everyday wear",
		Category:    "Activewear",
		Size:        "M",
		Color:       "Black",
	},
	{
		ID:          "9",
		Name:        "Denim Jacket",
		Price:       79,
		Image:       "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Classic denim jacket with a modern fit and vintage wash",
		Category:    "Outerwear",
		Size:        "M",
		Color:       "Light Blue",
	},
	{
		ID:          "10",
		Name:        "Silk Evening Dress",
		Price:       159,
		Image:       "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Elegant floor-length silk dress for special occasions",
		Category:    "Dresses",
		Size:        "M",
		Color:       "Burgundy",
	},
	{
		ID:          "11",
		Name:        "Canvas Sneakers",
		Price:       38,
		Image:       "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Casual canvas sneakers with rubber outsole, perfect for everyday wear",
		Category:    "Footwear",
		Size:        "42",
		Color:       "White",
	},
	{
		ID:          "12",
		Name:        "Wool Beanie",
		Price:       22,
		Image:       "https://images.unsplash.com/photo-1576063849362-c842f1d7251d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Warm knitted beanie made from premium wool blend",
		Category:    "Accessories",
		Size:        "One Size",
		Color:       "Grey",
	},
	{
		ID:          "13",
		Name:        "Tailored Blazer",
		Price:       125,
		Image:       "https://images.unsplash.com/photo-1548123378-8c44b599dad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Professional single-breasted blazer with a modern fit",
		Category:    "Outerwear",
		Size:        "M",
		Color:       "Black",
	},
	{
		ID:          "14",
		Name:        "Floral Summer Skirt",
		Price:       42,
		Image:       "https://images.unsplash.com/photo-1577900232427-18219b8349fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Light and flowy midi skirt with vibrant floral pattern",
		Category:    "Bottoms",
		Size:        "S",
		Color:       "Multicolor",
	},
	{
		ID:          "15",
		Name:        "Leather Crossbody Bag",
		Price:       85,
		Image:       "https://images.unsplash.com/photo-1594223274512-ad4b0a3367a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Compact genuine leather crossbody bag with adjustable strap",
		Category:    "Accessories",
		Size:        "One Size",
		Color:       "Tan",
	},
	{
		ID:          "16",
		Name:        "Performance Running Shoes",
		Price:       110,
		Image:       "https://images.unsplash.com/photo-1565814329452-e7aebc7caffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Lightweight running shoes with superior cushioning and support",
		Category:    "Footwear",
		Size:        "41",
		Color:       "Blue/Neon",
	},
	{
		ID:          "17",
		Name:        "Patterned Button-Up Shirt",
		Price:       55,
		Image:       "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Short-sleeve button-up shirt with unique geometric pattern",
		Category:    "Tops",
		Size:        "L",
		Color:       "Multi",
	},
	{
		ID:          "18",
		Name:        "Cargo Pants",
		Price:       65,
		Image:       "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		Description: "Durable cotton cargo pants with multiple utility pockets",
		Category:    "Bottoms",
		Size:        "34",
		Color:       "Khaki",
	},
}

// Get all products
func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// Get a single product by ID
func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for _, item := range products {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	// If product not found
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

// Create a new product
func createProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var product Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	// Generate a new ID based on the current length of products
	product.ID = strconv.Itoa(len(products) + 1)

	// Add to products slice
	products = append(products, product)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(product)
}

// Update an existing product
func updateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var updatedProduct Product
	err := json.NewDecoder(r.Body).Decode(&updatedProduct)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	for i, item := range products {
		if item.ID == params["id"] {
			// Keep the original ID
			updatedProduct.ID = params["id"]
			// Replace the product
			products[i] = updatedProduct
			json.NewEncoder(w).Encode(updatedProduct)
			return
		}
	}

	// If product not found
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

// Delete a product
func deleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for i, item := range products {
		if item.ID == params["id"] {
			// Remove the product
			products = append(products[:i], products[i+1:]...)
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]string{"message": "Product deleted successfully"})
			return
		}
	}

	// If product not found
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

func main() {
	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/api/products", getProducts).Methods("GET")
	r.HandleFunc("/api/products/{id}", getProduct).Methods("GET")
	r.HandleFunc("/api/products", createProduct).Methods("POST")
	r.HandleFunc("/api/products/{id}", updateProduct).Methods("PUT")
	r.HandleFunc("/api/products/{id}", deleteProduct).Methods("DELETE")

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

	fmt.Println("Clothing Store API running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
