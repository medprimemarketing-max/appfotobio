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
    me: () => request('GET', '/user/me'),
    updateLanguage: (language) => request('PUT', '/user/language', { language }),
    subscription: () => request('GET', '/user/subscription'),
  },
  notes: {
    list: (pathologyId) => request('GET', `/notes?pathology_id=${encodeURIComponent(pathologyId)}`),
    create: (data) => request('POST', '/notes', data),
    update: (id, data) => request('PUT', `/notes/${id}`, data),
    delete: (id) => request('DELETE', `/notes/${id}`),
  },
  admin: {
    createUser: (data) => request('POST', '/admin/users', data),
    listUsers: () => request('GET', '/admin/users'),
    updateSubscription: (id, data) => request('PUT', `/admin/users/${encodeURIComponent(id)}/subscription`, data),
    updateRole: (id, data) => request('PUT', `/admin/users/${encodeURIComponent(id)}/role`, data),
    export: () => request('POST', '/admin/export'),
  },
  payments: {
    mercadopago: {
      createPreference: () => request('POST', '/payments/mercadopago/create-preference'),
    },
    paypal: {
      createOrder: () => request('POST', '/payments/paypal/create-order'),
      captureOrder: (orderId) => request('POST', '/payments/paypal/capture-order', { orderId }),
    },
  },
};
