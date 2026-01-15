export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
};

export type ProductPayload = Omit<Product, "id">;
