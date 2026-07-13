/**
 * API Integration Services
 * Connects the Next.js frontend to the AWS Serverless Backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';

/**
 * Generic fetch wrapper for API calls
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Inject JWT token from localStorage if in browser environment
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred during the API request.');
  }
  
  return response.json();
}

/**
 * Product API Services
 */
export const ProductsAPI = {
  getProducts: (params?: Record<string, any>) => {
    let query = '';
    if (params) {
      const q = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      ).toString();
      if (q) query = `?${q}`;
    }
    return fetchAPI(`/products${query}`, { method: 'GET' });
  },
  
  getProductById: (id: string) => fetchAPI(`/products/${id}`, { method: 'GET' }),
  
  createProduct: (data: any) => fetchAPI('/products', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  updateProduct: (id: string, data: any) => fetchAPI(`/products/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  
  deleteProduct: (id: string) => fetchAPI(`/products/${id}`, { 
    method: 'DELETE' 
  }),

  getPresignedUrl: (filename: string, contentType: string) => 
    fetchAPI(`/products/presigned-url?filename=${encodeURIComponent(filename)}&contentType=${encodeURIComponent(contentType)}`, { 
      method: 'GET' 
    }),
};

/**
 * AI Assistant API Services
 * (Connects to Amazon Bedrock)
 */
export const AiAPI = {
  askAssistant: (message: string, context?: any) => 
    fetchAPI('/ai/chat', { 
      method: 'POST', 
      body: JSON.stringify({ message, context }) 
    }),
};

/**
 * User / Authentication API Services
 * (Connects to Cognito via API endpoints)
 */
export const AuthAPI = {
  login: async (credentials: any) => {
    const res = await fetchAPI('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  register: (data: any) => fetchAPI('/auth/register', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),

  verifyOTP: (otp: string, email: string) => fetchAPI('/auth/verify', { 
    method: 'POST', 
    body: JSON.stringify({ otp, email }) 
  }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

/**
 * Persistent Cart API Services
 */
export const CartAPI = {
  getCart: () => fetchAPI('/cart', { method: 'GET' }),
  
  updateCart: (items: any[]) => fetchAPI('/cart', { 
    method: 'POST', 
    body: JSON.stringify({ items }) 
  }),
  
  clearCart: () => fetchAPI('/cart', { method: 'DELETE' }),
};

/**
 * Orders API Services
 */
export const OrdersAPI = {
  createOrder: (orderData: any) => fetchAPI('/orders', { 
    method: 'POST', 
    body: JSON.stringify(orderData) 
  }),
  
  getOrders: () => fetchAPI('/orders', { method: 'GET' }),
  
  getOrderById: (id: string) => fetchAPI(`/orders/${id}`, { method: 'GET' }),
  
  updateOrderStatus: (id: string, status: string) => fetchAPI(`/orders/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify({ status }) 
  }),
};
