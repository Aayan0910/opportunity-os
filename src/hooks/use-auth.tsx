"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface UserAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("opp-os-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const getUsers = (): Record<string, { name: string; email: string; password: string }> => {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem("opp-os-users");
    return data ? JSON.parse(data) : {};
  };

  const saveUsers = (users: Record<string, { name: string; email: string; password: string }>) => {
    localStorage.setItem("opp-os-users", JSON.stringify(users));
  };

  const signup = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users[email]) {
      return { success: false, error: "An account with this email already exists" };
    }
    users[email] = { name, email, password };
    saveUsers(users);
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("opp-os-user", JSON.stringify(newUser));
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users[email];
    if (!found) {
      return { success: false, error: "No account found with this email" };
    }
    if (found.password !== password) {
      return { success: false, error: "Incorrect password" };
    }
    const loggedIn = { name: found.name, email: found.email };
    setUser(loggedIn);
    localStorage.setItem("opp-os-user", JSON.stringify(loggedIn));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("opp-os-user");
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuthenticated: !!user, signup, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useUserAuth must be used within UserAuthProvider");
  return context;
}
