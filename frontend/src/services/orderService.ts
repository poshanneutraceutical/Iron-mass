import axios from "axios";
import type { AxiosInstance } from "axios";
const API_URL =
  import.meta.env.VITE_API_URL || "/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface CheckoutRequest {
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
  items: OrderItem[];
}

export const orderService = {
  /**
   * Place Order (Checkout)
   */
  async checkout(request: CheckoutRequest): Promise<Order> {
    const { data } = await api.post<Order>(
      "/orders/checkout",
      request
    );

    return data;
  },

  /**
   * Get Order By ID
   */
  async getOrder(orderId: number): Promise<Order> {
    const { data } = await api.get<Order>(
      `/orders/${orderId}`
    );

    return data;
  },

  /**
   * Get All Orders of a Customer
   */
  async getCustomerOrders(
    customerId: string
  ): Promise<Order[]> {
    const { data } = await api.get<Order[]>(
      `/orders/customer/${customerId}`
    );

    return data;
  },
};

export default orderService;