import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const loginUser = async () => {
      const currentUser = localStorage.getItem("user");

      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        try {
          // token check
          const res = await axiosInstance.get("/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          });

          setUser({
            ...parsedUser,
            ...res.data,
          });
        } catch (err) {
          localStorage.removeItem("user");
        }
      }
      setIsPending(false);
    };

    loginUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isPending }}>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
