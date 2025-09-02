// src/pages/Inbox.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/api";

export default function Inbox() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) {
        // If no session, redirect to login
        navigate("/");
      } else {
        setUser(u);
      }
    });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {user ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Welcome, {user.email} 🎉</h2>
          <p className="text-gray-600 mb-6">
            Your AI-sorted inbox will appear here soon 🚀
          </p>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-gray-500">Loading your inbox...</p>
      )}
    </div>
  );
}
