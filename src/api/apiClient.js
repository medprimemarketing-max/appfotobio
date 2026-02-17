import { auth } from '@/config/firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

async function request(method, path, body = undefined) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeaders()),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const err = new Error(errorData.error || `Request failed: ${res.status}`);
    err.status = res.status;
    err.data = errorData;
    throw err;
  }

  return res.json();
}

export const apiClient = {
  user: {
    me: () => request('GET', '/api/user/me'),
    updateLanguage: (language) => request('PUT', '/api/user/language', { language }),
    subscription: () => request('GET', '/api/user/subscription'),
  },
  notes: {
    list: (pathologyId) => request('GET', `/api/notes?pathology_id=${encodeURIComponent(pathologyId)}`),
    create: (data) => request('POST', '/api/notes', data),
    update: (id, data) => request('PUT', `/api/notes/${id}`, data),
    delete: (id) => request('DELETE', `/api/notes/${id}`),
  },
  admin: {
    createUser: (data) => request('POST', '/api/admin/users', data),
    export: () => request('POST', '/api/admin/export'),
  },
  payments: {
    mercadopago: {
      createPreference: () => request('POST', '/api/payments/mercadopago/create-preference'),
    },
    paypal: {
      createOrder: () => request('POST', '/api/payments/paypal/create-order'),
      captureOrder: (orderId) => request('POST', '/api/payments/paypal/capture-order', { orderId }),
    },
  },
};
