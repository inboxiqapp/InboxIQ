import React from 'react';

export default function Login() {
  const handleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">InboxIQ</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}