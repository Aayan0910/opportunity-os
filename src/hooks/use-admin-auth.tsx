"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminAuthContextType {
  isAdmin: boolean;
  adminUser: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "oppo2026",
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_user");
    }
    return null;
  });

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setAdminUser(username);
      localStorage.setItem("admin_user", username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin: !!adminUser, adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
}
