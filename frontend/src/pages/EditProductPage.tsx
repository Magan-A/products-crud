import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getProductById, updateProduct } from "../api/products";
import ProductForm from "../components/ProductForm";
import type { ProductPayload } from "../types/product";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initial, setInitial] = useState<ProductPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const product = await getProductById(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...rest } = product;
        setInitial(rest);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el producto",
        });
        console.error(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleUpdate = async (data: ProductPayload) => {
    if (!id) return;

    try {
      await updateProduct(id, data);

      await Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "Los cambios se guardaron correctamente",
        confirmButtonColor: "#2563eb",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el producto",
      });
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Cargando el producto...</p>
      </div>
    );
  }

  if (!initial) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar producto</h1>

      <ProductForm initialData={initial} onSubmit={handleUpdate} />
    </div>
  );
}
