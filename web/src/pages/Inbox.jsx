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
        <p className="text-gray-500">Loading your inbox...</p>
      ) : emails.length > 0 ? (
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold">{email.subject}</h3>
              <p className="text-sm text-gray-600">{email.from}</p>
              <p className="text-gray-500 mt-1">{email.snippet}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No emails found.</p>
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


