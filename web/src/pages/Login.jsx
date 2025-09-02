import React from "react";
import { loginWithGoogle } from "../services/api";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">InboxIQ</h1>
        <p className="mb-6">Sign in to clean up your inbox</p>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

