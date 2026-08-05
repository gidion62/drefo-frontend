// Base URL for the DREFO backend API.
// Set VITE_API_URL in your .env file, e.g. VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'drefo_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Token expired or invalid — clear it so the UI redirects to login
    if (res.status === 401) clearToken();
    throw new ApiError(data.message || 'Something went wrong.', res.status);
  }

  return data as T;
}

// ── Auth ──────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function login(email: string, password: string) {
  return request<{ success: boolean; token: string; admin: AdminUser }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function getMe() {
  return request<{ success: boolean; admin: AdminUser }>('/auth/me');
}

// ── Dashboard ─────────────────────────────────
export interface DashboardStats {
  [key: string]: number;
}

export function getStats() {
  return request<{ success: boolean; data: DashboardStats }>('/admin/stats');
}

// ── Contacts ──────────────────────────────────
export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  adminNotes?: string;
  createdAt: string;
}

export function getContacts(status?: string) {
  const qs = status ? `?status=${status}` : '';
  return request<{ success: boolean; data: Contact[] }>(`/admin/contacts${qs}`);
}

export function updateContact(id: string, payload: { status?: string; adminNotes?: string }) {
  return request<{ success: boolean; data: Contact }>(`/admin/contacts/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteContact(id: string) {
  return request<{ success: boolean }>(`/admin/contacts/${id}`, { method: 'DELETE' });
}

// ── Volunteers ────────────────────────────────
export interface Volunteer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  interests: string[];
  skills?: string;
  availability: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'declined';
  adminNotes?: string;
  createdAt: string;
}

export function getVolunteers(status?: string) {
  const qs = status ? `?status=${status}` : '';
  return request<{ success: boolean; data: Volunteer[] }>(`/admin/volunteers${qs}`);
}

export function updateVolunteer(id: string, payload: { status?: string; adminNotes?: string }) {
  return request<{ success: boolean; data: Volunteer }>(`/admin/volunteers/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteVolunteer(id: string) {
  return request<{ success: boolean }>(`/admin/volunteers/${id}`, { method: 'DELETE' });
}
