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

// app/routes/_index.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1742298269701.119";
}
function IndexPage() {
  _s();
  const [products, setProducts] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)("");
  const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
  (0, import_react.useEffect)(() => {
    fetch("http://localhost:8080/api/products").then((response) => {
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
  }, []);
  const categories = ["All", ...new Set(products.map((product) => product.category).filter(Boolean))];
  const filteredProducts = selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center items-center p-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg", children: "Loading products..." }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 52,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 51,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center items-center p-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-lg", children: error }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 57,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 56,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center mb-8 gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-center", children: "Clothing Shop" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 62,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/admin", className: "text-blue-500 underline text-sm", children: "Admin Panel" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 63,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 61,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap justify-center gap-3 mb-8", children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-4 py-2 rounded-full text-sm ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`, onClick: () => setSelectedCategory(category), children: category }, category, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 67,
      columnNumber: 45
    }, this)) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 66,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md overflow-hidden hover:translate-y-[-4px] transition-transform", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.image, alt: product.name, className: "w-full h-72 object-cover bg-gray-100" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 74,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-bold mb-1", children: product.name }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 76,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 mb-2", children: product.category || "Uncategorized" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 77,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: product.color || "N/A" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 79,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: [
            "Size: ",
            product.size || "N/A"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 80,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 78,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg font-bold text-red-600 mb-2", children: [
          "$",
          product.price
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 82,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 line-clamp-3", children: product.description }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 83,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 75,
        columnNumber: 25
      }, this)
    ] }, product.id, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 73,
      columnNumber: 50
    }, this)) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 72,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(IndexPage, "OURQuUAAMxks3tDv0DdPE7bmdTY=");
_c = IndexPage;
var _c;
$RefreshReg$(_c, "IndexPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  IndexPage as default
};
//# sourceMappingURL=/build/routes/_index-RJI5AK5U.js.map
