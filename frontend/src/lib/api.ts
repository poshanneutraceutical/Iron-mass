const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  'http://localhost:8080/api';


export type Product = {

  id: number;

  name: string;

  price: number;

  description: string | null;

  category: string | null;

  images: string[];

  badge: string | null;

  featured: boolean;

  inStock: boolean;

};


export type DistributorInquiry = {

  fullName: string;

  email: string;

  phone?: string;

  businessName?: string;

  city?: string;

  state?: string;

  message?: string;

};


export type ContactMessage = {

  name: string;

  email: string;

  subject?: string;

  message: string;

};



async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {

  const res = await fetch(`${API_URL}${path}`, {

    headers: {
      'Content-Type': 'application/json'
    },

    ...options,

  });


  if (!res.ok) {

    const text =
      await res.text().catch(() => 'Request failed');

    throw new Error(
      text || `Request failed (${res.status})`
    );
  }


  if (res.status === 204)

    return undefined as T;


  return res.json() as Promise<T>;
}



export const api = {

  // Products
  getProducts: () =>
    request<Product[]>('/products'),


  getProduct: (id: number) =>
    request<Product>(`/products/${id}`),



  // Distributor
  submitDistributor: (
    data: DistributorInquiry
  ) =>
    request<DistributorInquiry>(
      '/distributor',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),



  // Contact
  submitContact: (
    data: ContactMessage
  ) =>
    request<ContactMessage>(
      '/contact',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),
};