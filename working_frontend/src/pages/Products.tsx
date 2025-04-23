import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Plus, Search, RefreshCw } from "lucide-react";
import LoadingOverlay from "../components/LoadingOverlay";
import { useToast } from "../components/Toast";
import api from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setIsRefreshing(true);
      const response = await api.get("/inventory_and_orders/api/products/");
      setProducts(response.data);
      addToast("Products loaded successfully", "success");
    } catch (error) {
      console.error("Error fetching products:", error);
      addToast("Failed to load products", "error");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddProduct = () => {
    navigate("/products/new");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshData = () => {
    fetchProducts();
  };

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      {loading && <LoadingOverlay isLoading={loading} />}
      
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-purple-700">
              Products
            </h2>
            <div className="flex gap-2">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
              <button
                onClick={handleAddProduct}
                className="flex items-center rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {products.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        {product.description && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {formatPrice(product.price)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {product.category ? product.category.substring(0, 8) + "..." : "None"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        <button
                          onClick={() => handleViewDetails(product.id)}
                          className="inline-flex items-center rounded-md bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-100"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-center text-gray-500">
                {loading ? "Loading products..." : "No products available."}
              </p>
            </div>
          )}

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="mt-4 text-center text-gray-500">
              No products match your search.
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500 text-right">
            Total products: {products.length}
          </div>
        </div>
      </div>
    </div>
  );
}