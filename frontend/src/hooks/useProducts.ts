import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getProducts, deleteProduct } from "../api/products";
import type { Product } from "../types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const data = await getProducts(query);
      setProducts(data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    await deleteProduct(id);
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Producto eliminado correctamente",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    fetchProducts(search);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    search,
    setSearch,
    fetchProducts,
    removeProduct,
  };
}
