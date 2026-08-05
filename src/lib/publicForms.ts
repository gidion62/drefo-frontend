import { API_URL } from './api';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data as T;
}

export function submitContactForm(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return post<{ success: boolean; message?: string }>('/contact', payload);
}

export function submitVolunteerApplication(payload: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  interests: string[];
  skills?: string;
  availability: string;
  message?: string;
}) {
  return post<{ success: boolean; message?: string }>('/volunteer', payload);
}
