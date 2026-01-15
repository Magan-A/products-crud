import axios from "axios";
import type { Product, ProductPayload } from "../types/product";

const API = import.meta.env.VITE_API_URL;

export const getProducts = async (search?: string): Promise<Product[]> => {
  const res = await axios.get(`${API}/api/products`, {
    params: search ? { search } : {},
  });
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API}/api/products/${id}`);
  return res.data;
};

export const createProduct = async (data: ProductPayload) => {
  return axios.post(`${API}/api/products`, data);
};

export const updateProduct = async (id: string, data: ProductPayload) => {
  return axios.put(`${API}/api/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return axios.delete(`${API}/api/products/${id}`);
};
