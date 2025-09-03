// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export function loginWithGoogle() {
  window.location.href = `${API_URL}/api/auth/google`;
}

export async function getUserProfile() {
  const res = await fetch(`${API_URL}/api/me`, {
    credentials: "include"
  });
  if (!res.ok) {
    throw new Error("Not authenticated");
  }
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch("https://inboxiq-hf2n.onrender.com/api/auth/me", {
    credentials: "include" // <-- important so cookies are sent
  });

  if (!res.ok) return null;
  return res.json();
}

export async function fetchEmails() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`/api/gmail/messages?accessToken=${token}`);
  return res.json();
}

export function logout() {
  window.location.href = "https://inboxiq-hf2n.onrender.com/api/auth/logout";
}
