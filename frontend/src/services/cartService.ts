import axios from "axios";
import type { AxiosInstance } from "axios";

const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  "http://localhost:8080/api";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   TYPES
========================================================= */

export interface AddToCartRequest {
  customerId: string;
  productId: number;
  quantity: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number | null;
  customerId: string;
  totalAmount: number;
  items: CartItem[];
}

/* =========================================================
   CART SERVICE
========================================================= */

class CartService {

  /* -------------------------------------------------------
     ADD PRODUCT TO CART
  ------------------------------------------------------- */

  async addToCart(
    data: AddToCartRequest
  ): Promise<Cart> {

    const response =
      await api.post<Cart>(
        "/cart/add",
        data
      );

    return response.data;
  }

  /* -------------------------------------------------------
     GET CART
  ------------------------------------------------------- */

  async getCart(
    customerId: string
  ): Promise<Cart> {

    const response =
      await api.get<Cart>(
        `/cart/${encodeURIComponent(customerId)}`
      );

    return response.data;
  }

  /* -------------------------------------------------------
     UPDATE PRODUCT QUANTITY
  ------------------------------------------------------- */

  async updateQuantity(
    customerId: string,
    productId: number,
    quantity: number
  ): Promise<Cart> {

    const response =
      await api.put<Cart>(
        `/cart/${encodeURIComponent(customerId)}/${productId}`,
        null,
        {
          params: {
            quantity,
          },
        }
      );

    return response.data;
  }

  /* -------------------------------------------------------
     REMOVE PRODUCT FROM CART
  ------------------------------------------------------- */

  async removeItem(
    customerId: string,
    productId: number
  ): Promise<Cart> {

    const response =
      await api.delete<Cart>(
        `/cart/${encodeURIComponent(customerId)}/${productId}`
      );

    return response.data;
  }

  /* -------------------------------------------------------
     CLEAR ENTIRE CART
  ------------------------------------------------------- */

  async clearCart(
    customerId: string
  ): Promise<void> {

    await api.delete(
      `/cart/${encodeURIComponent(customerId)}/clear`
    );
  }
}

/* =========================================================
   EXPORT
========================================================= */

export default new CartService();