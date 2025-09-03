// src/pages/Inbox.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/api";

export default function Inbox() {
  const [user, setUser] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const u = await getCurrentUser();
      if (!u) {
        // If no session, redirect to login
        navigate("/");
      } else {
        setUser(u);

        try {
          // fetch Gmail messages from backend
          const res = await fetch("/api/gmail/messages", {
            credentials: "include", // keep session cookie
          });
          const data = await res.json();
          setEmails(data);
        } catch (err) {
          console.error("❌ Failed to fetch emails:", err);
        }
      }
      setLoading(false);
    }
    init();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {user ? (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user.email} 🎉</h2>
          <p className="text-gray-600 mb-6">
            Your AI-sorted inbox preview is below 🚀
          </p>

          {loading ? (
            <p className="text-gray-500">Loading emails...</p>
          ) : emails.length === 0 ? (
            <p className="text-gray-500">No recent emails found.</p>
          ) : (
            <ul className="divide-y border rounded-lg bg-white shadow">
              {emails.map((email) => (
                <li key={email.id} className="p-4 hover:bg-gray-50">
                  <p className="font-medium">{email.subject || "(No subject)"}</p>
                  <p className="text-sm text-gray-600">{email.from}</p>
                  <p className="text-xs text-gray-400">{email.date}</p>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={logout}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading your inbox...</p>
      )}
    </div>
  );
}

