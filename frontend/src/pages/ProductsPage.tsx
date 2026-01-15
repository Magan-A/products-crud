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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Productos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Administra tu catálogo, busca productos y edita sus detalles.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            <span className="text-lg leading-none">＋</span>
            <span>Nuevo producto</span>
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100 bg-slate-50/60">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                🔍
              </span>
              <input
                placeholder="Buscar por nombre, categoría..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              onClick={() => fetchProducts(search)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              Aplicar filtro
            </button>
          </div>

          <div className="relative overflow-x-auto overflow-y-auto max-h-[28rem]">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Producto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categoría
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Precio
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-3 items-start">
                        <img
                          src={p.image || "https://via.placeholder.com/80"}
                          alt={p.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 bg-slate-100"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">
                            {p.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 line-clamp-2 max-w-md">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-4 py-3 align-middle">
                      <p className="font-semibold text-slate-900">
                        ${Number(p.price).toFixed(2)}
                      </p>
                    </td>

                    <td className="px-4 py-3 align-middle">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/edit/${p.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 hover:border-blue-200"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="inline-flex items-center justify-center rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 hover:border-red-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No hay productos para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
