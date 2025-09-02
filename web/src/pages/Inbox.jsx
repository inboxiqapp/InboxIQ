import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

export default function Inbox() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="p-6">
      {user ? (
        <h2>Welcome, {user.email} 🎉</h2>
      ) : (
        <p>Loading your inbox...</p>
      )}
    </div>
  );
}
