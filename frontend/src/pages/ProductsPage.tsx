import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, search, setSearch, fetchProducts, removeProduct } =
    useProducts();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>

        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit"
        >
          + Crear producto
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={() => fetchProducts(search)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Buscar
        </button>
      </div>

      <div className="relative overflow-x-auto overflow-y-auto max-h-96 bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex gap-3 items-start">
                    <img
                      src={p.image || "https://via.placeholder.com/80"}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3">{p.category}</td>

                <td className="p-3 font-medium">
                  ${Number(p.price).toFixed(2)}
                </td>

                <td className="p-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/edit/${p.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No hay productos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
