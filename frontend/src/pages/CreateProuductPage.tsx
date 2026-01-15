import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto. Intente de nuevo.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Nuevo producto
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Completa la información para agregar un nuevo producto al
              catálogo.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <ProductForm onSubmit={handleCreate} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
