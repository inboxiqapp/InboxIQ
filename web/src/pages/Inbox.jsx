import React, { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/api";

export default function Inbox() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {user ? (
        <>
          <h2 className="text-2xl font-bold">Welcome, {user.email} 🎉</h2>
          <button
            onClick={logout}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading your inbox...</p>
      )}
    </div>
  );
}
