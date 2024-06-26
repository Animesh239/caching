"use client";

import { useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import dynamic from "next/dynamic";
const Translation = dynamic(() => import("./components/Translation"), {
  ssr: false,
}); // lazy loading

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        {user ? (
          <>
            <p className="text-lg font-semibold mb-4">
              Welcome, {user.displayName}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-4"
            >
              Logout
            </button>
            <Translation />
          </>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}
