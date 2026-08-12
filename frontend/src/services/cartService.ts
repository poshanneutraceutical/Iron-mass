import axios from "axios";
import type { AxiosInstance } from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface AddToCartRequest {
  customerId: string;
  productId: number;
  quantity: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  customerId: string;
  totalAmount: number;
  items: CartItem[];
}

class CartService {
  async addToCart(data: AddToCartRequest): Promise<Cart> {
    const response = await api.post<Cart>("/cart/add", data);
    return response.data;
  }

  async getCart(customerId: string): Promise<Cart> {
    const response = await api.get<Cart>(`/cart/${customerId}`);
    return response.data;
  }

  async updateQuantity(
    customerId: string,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    const response = await api.put<Cart>(
      `/cart/${customerId}/${productId}`,
      null,
      {
        params: { quantity },
      }
    );

    return response.data;
  }

  async removeItem(
    customerId: string,
    productId: number
  ): Promise<Cart> {
    const response = await api.delete<Cart>(
      `/cart/${customerId}/${productId}`
    );

    return response.data;
  }

  async clearCart(customerId: string): Promise<void> {
    await api.delete(`/cart/${customerId}/clear`);
  }
}

export default new CartService();