"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  course: string;
  year: string;
  interests: string[];
  lookingFor: string[];
  location: string;
  goal: string;
  onboardingComplete: boolean;
}

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  completeOnboarding: (profile: Omit<UserProfile, "name" | "email" | "onboardingComplete">) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
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
    const newUser: UserProfile = {
      name,
      email,
      course: "",
      year: "",
      interests: [],
      lookingFor: [],
      location: "",
      goal: "",
      onboardingComplete: false,
    };
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
    const saved = localStorage.getItem("opp-os-user");
    let profile: UserProfile;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email === email) {
          profile = parsed;
        } else {
          profile = {
            name: found.name,
            email: found.email,
            course: "",
            year: "",
            interests: [],
            lookingFor: [],
            location: "",
            goal: "",
            onboardingComplete: false,
          };
        }
      } catch {
        profile = {
          name: found.name,
          email: found.email,
          course: "",
          year: "",
          interests: [],
          lookingFor: [],
          location: "",
          goal: "",
          onboardingComplete: false,
        };
      }
    } else {
      profile = {
        name: found.name,
        email: found.email,
        course: "",
        year: "",
        interests: [],
        lookingFor: [],
        location: "",
        goal: "",
        onboardingComplete: false,
      };
    }
    setUser(profile);
    localStorage.setItem("opp-os-user", JSON.stringify(profile));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("opp-os-user");
  };

  const completeOnboarding = (profile: Omit<UserProfile, "name" | "email" | "onboardingComplete">) => {
    if (!user) return;
    const updated = { ...user, ...profile, onboardingComplete: true };
    setUser(updated);
    localStorage.setItem("opp-os-user", JSON.stringify(updated));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("opp-os-user", JSON.stringify(updated));
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuthenticated: !!user, signup, login, logout, completeOnboarding, updateProfile }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useUserAuth must be used within UserAuthProvider");
  return context;
}
