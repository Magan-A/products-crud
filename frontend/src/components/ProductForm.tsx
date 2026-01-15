import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ProductPayload } from "../types/product";

type Props = {
  initialData?: ProductPayload;
  onSubmit: (data: ProductPayload) => Promise<void>;
};

export default function ProductForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductPayload>(
    initialData ?? {
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";

    if (!form.category.trim())
      newErrors.category = "La categoría es obligatoria";

    if (!form.description.trim())
      newErrors.description = "La descripción es obligatoria";

    if (form.price <= 0) newErrors.price = "El precio debe ser mayor a 0";

    if (form.image && !form.image.startsWith("http"))
      newErrors.image = "La imagen debe ser una URL válida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-xl space-y-4"
    >
      <div>
        <input
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          name="category"
          placeholder="Categoría"
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={handleChange}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Descripción"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div>
        <input
          name="image"
          placeholder="URL de imagen (opcional)"
          className="w-full border p-2 rounded"
          value={form.image}
          onChange={handleChange}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="ms-2 px-4 py-2 rounded bg-gray-300 border border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Cancelar
      </button>
    </form>
  );
}
