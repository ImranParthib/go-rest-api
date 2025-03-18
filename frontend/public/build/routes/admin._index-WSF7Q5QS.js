import {
  Link
} from "/build/_shared/chunk-DQDVJNOY.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-6OGVL3Q3.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/admin._index.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\admin._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\admin._index.tsx"
  );
  import.meta.hot.lastModified = "1742298269748.6516";
}
var API_URL = "http://localhost:8080/api/products";
var CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Dresses", "Accessories", "Footwear", "Activewear"];
var SIZES = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "One Size"];
function AdminPage() {
  _s();
  const [products, setProducts] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)("");
  const [success, setSuccess] = (0, import_react.useState)("");
  const [showForm, setShowForm] = (0, import_react.useState)(false);
  const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
  const [formData, setFormData] = (0, import_react.useState)({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "Tops",
    size: "M",
    color: ""
  });
  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      setProducts(data);
      setLoading(false);
    }).catch((err) => {
      setError("Failed to fetch products: " + err.message);
      setLoading(false);
    });
  };
  (0, import_react.useEffect)(() => {
    fetchProducts();
  }, []);
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseInt(value, 10) || 0 : value
    });
  };
  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      image: "",
      description: "",
      category: "Tops",
      size: "M",
      color: ""
    });
    setEditingProduct(null);
    setError("");
    setSuccess("");
  };
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category || "Tops",
      size: product.size || "M",
      color: product.color || ""
    });
    setEditingProduct(product);
    setShowForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.name || formData.price <= 0 || !formData.image || !formData.description || !formData.color) {
      setError("Please fill all fields with valid values");
      return;
    }
    const isEditing = !!editingProduct;
    const url = isEditing ? `${API_URL}/${editingProduct.id}` : API_URL;
    const method = isEditing ? "PUT" : "POST";
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save product");
      }
      return response.json();
    }).then(() => {
      setSuccess(isEditing ? "Product updated successfully!" : "Product created successfully!");
      fetchProducts();
      resetForm();
      setShowForm(false);
    }).catch((err) => {
      setError("Error: " + err.message);
    });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      }).then(() => {
        setSuccess("Product deleted successfully!");
        fetchProducts();
      }).catch((err) => {
        setError("Error: " + err.message);
      });
    }
  };
  if (loading && products.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center items-center p-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg", children: "Loading products..." }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 176,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 175,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 174,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", className: "inline-block px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300", children: "\u2190 Back to Shop" }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 182,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 181,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Clothing Store Administration" }, void 0, false, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 188,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-primary", onClick: handleAddNew, children: "Add New Product" }, void 0, false, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 189,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 187,
      columnNumber: 13
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-600 my-4", children: error }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 194,
      columnNumber: 23
    }, this),
    success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-green-600 my-4", children: success }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 195,
      columnNumber: 25
    }, this),
    showForm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-bold", children: editingProduct ? "Edit Product" : "Add New Product" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 199,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-2xl border-none bg-transparent", onClick: () => setShowForm(false), children: "\xD7" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 202,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 198,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "name", children: "Product Name:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 209,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "name", className: "w-full p-2 border rounded", name: "name", value: formData.name, onChange: handleInputChange, placeholder: "Enter product name" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 210,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 208,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "category", children: "Category:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 214,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "category", className: "w-full p-2 border rounded", name: "category", value: formData.category, onChange: handleInputChange, children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: category, children: category }, category, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 216,
            columnNumber: 61
          }, this)) }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 215,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 213,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "size", children: "Size:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 221,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "size", className: "w-full p-2 border rounded", name: "size", value: formData.size, onChange: handleInputChange, children: SIZES.map((size) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: size, children: size }, size, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 223,
            columnNumber: 52
          }, this)) }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 222,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 220,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "color", children: "Color:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 228,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "color", className: "w-full p-2 border rounded", name: "color", value: formData.color, onChange: handleInputChange, placeholder: "Enter color (e.g., Blue, Red, Black)" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 229,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 227,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "price", children: "Price ($):" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 233,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "price", className: "w-full p-2 border rounded", type: "number", name: "price", value: formData.price.toString(), onChange: handleInputChange, placeholder: "Enter price" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 234,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 232,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "image", children: "Image URL:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 238,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "image", className: "w-full p-2 border rounded", name: "image", value: formData.image, onChange: handleInputChange, placeholder: "Enter image URL" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 239,
            columnNumber: 29
          }, this),
          formData.image && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "mt-2 max-w-[100px] max-h-[100px]", src: formData.image, alt: "Product preview" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 240,
            columnNumber: 48
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 237,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-bold mb-2", htmlFor: "description", children: "Description:" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 244,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "description", className: "w-full p-2 border rounded", name: "description", value: formData.description, onChange: handleInputChange, placeholder: "Enter product description", rows: 4 }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 245,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 243,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "btn btn-secondary", onClick: () => setShowForm(false), children: "Cancel" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 249,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "btn btn-primary", children: "Save" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 252,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 248,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 207,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 197,
      columnNumber: 26
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Image" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 263,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Name" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 264,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Category" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 265,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Size" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 266,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Color" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 267,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Price" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 268,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "p-3 text-left", children: "Actions" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 269,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 262,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 261,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "border-t hover:bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "w-20 h-20 object-cover rounded", src: product.image, alt: product.name }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 275,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 274,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: product.name }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 277,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: product.category || "N/A" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 278,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: product.size || "N/A" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 279,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: product.color || "N/A" }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 280,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: [
          "$",
          product.price
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 281,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-secondary text-sm px-2 py-1", onClick: () => handleEdit(product), children: "Edit" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 284,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-danger text-sm px-2 py-1", onClick: () => handleDelete(product.id), children: "Delete" }, void 0, false, {
            fileName: "app/routes/admin._index.tsx",
            lineNumber: 287,
            columnNumber: 41
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 283,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "app/routes/admin._index.tsx",
          lineNumber: 282,
          columnNumber: 33
        }, this)
      ] }, product.id, true, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 273,
        columnNumber: 50
      }, this)) }, void 0, false, {
        fileName: "app/routes/admin._index.tsx",
        lineNumber: 272,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 260,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/admin._index.tsx",
      lineNumber: 259,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin._index.tsx",
    lineNumber: 180,
    columnNumber: 10
  }, this);
}
_s(AdminPage, "VPWw5BV7viyn7nbW15Vo6SMXFqY=");
_c = AdminPage;
var _c;
$RefreshReg$(_c, "AdminPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AdminPage as default
};
//# sourceMappingURL=/build/routes/admin._index-WSF7Q5QS.js.map
