import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../api/products";
import type { ProductPayload } from "../types/product";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: ProductPayload) => {
    try {
      await createProduct(data);

      await Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se creó exitosamente",
        confirmButtonColor: "#2563eb",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto. Intente de nuevo.",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear producto</h1>

      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
