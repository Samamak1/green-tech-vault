import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Company API
export const companyAPI = {
  getProfile: () => apiClient.get('/companies/me'),
  updateProfile: (data) => apiClient.put('/companies/me', data),
  getImpact: () => apiClient.get('/companies/me/impact')
};

// Pickup API
export const pickupAPI = {
  getAll: (params) => apiClient.get('/pickups', { params }),
  getById: (id) => apiClient.get(`/pickups/${id}`),
  create: (data) => apiClient.post('/pickups', data),
  update: (id, data) => apiClient.put(`/pickups/${id}`, data),
  delete: (id) => apiClient.delete(`/pickups/${id}`),
  getImpact: (id) => apiClient.get(`/pickups/${id}/impact`),
  complete: (id) => apiClient.put(`/pickups/${id}/complete`),
  getPickups: (params) => apiClient.get('/pickups', { params }),
  getPickupById: (id) => apiClient.get(`/pickups/${id}`),
  createPickup: (data) => apiClient.post('/pickups', data)
};

// Device API
export const deviceAPI = {
  getAll: (params) => apiClient.get('/devices', { params }),
  getById: (id) => apiClient.get(`/devices/${id}`),
  create: (data) => apiClient.post('/devices', data),
  update: (id, data) => apiClient.put(`/devices/${id}`, data),
  delete: (id) => apiClient.delete(`/devices/${id}`),
  updateDisposition: (id, disposition) => apiClient.put(`/devices/${id}/disposition`, { disposition }),
  getDevices: (params) => apiClient.get('/devices', { params }),
  getDeviceById: (id) => apiClient.get(`/devices/${id}`),
  createDevice: (data) => apiClient.post('/devices', data)
};

// Report API
export const reportAPI = {
  getAll: (params) => apiClient.get('/reports', { params }),
  getById: (id) => apiClient.get(`/reports/${id}`),
  create: (data) => apiClient.post('/reports', data),
  update: (id, data) => apiClient.put(`/reports/${id}`, data),
  delete: (id) => apiClient.delete(`/reports/${id}`),
  generate: (data) => apiClient.post('/reports/generate', data),
  publish: (id) => apiClient.put(`/reports/${id}/publish`),
  downloadPdf: (id) => apiClient.get(`/reports/${id}/pdf`, { responseType: 'blob' }),
  downloadCsv: (id) => apiClient.get(`/reports/${id}/csv`, { responseType: 'blob' }),
  getReports: (params) => apiClient.get('/reports', { params }),
  getReportById: (id) => apiClient.get(`/reports/${id}`),
  createReport: (data) => apiClient.post('/reports', data)
};

// Dashboard API
export const dashboardAPI = {
  getSummary: () => apiClient.get('/dashboard/summary'),
  getChartData: (metric, period) => apiClient.get(`/dashboard/chart?metric=${metric}&period=${period}`),
  getRecentPickups: () => apiClient.get('/dashboard/recent-pickups'),
  getRecentDevices: () => apiClient.get('/dashboard/recent-devices')
};

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (data) => apiClient.post('/auth/register', data),
  getMe: () => apiClient.get('/auth/me'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiClient.put('/auth/reset-password', { token, password })
};

export default {
  companyAPI,
  pickupAPI,
  deviceAPI,
  reportAPI,
  dashboardAPI,
  authAPI
}; 