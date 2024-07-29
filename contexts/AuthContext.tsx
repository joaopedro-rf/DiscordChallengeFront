"use client";
import { createContext, useContext, useState, ReactNode, use } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  status: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (
    credentials: Credentials
  ): Promise<{ token: string }> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/auth/login`,
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/");
      setIsAuthenticated(true);
      return { token };
    } catch (error) {
      throw new Error("Authentication failed");
    }
  };

  /* ADD GET PROFILE FUNCTION

   async getProfile(token) {
    try {
      const response = await axios.get(`${apiUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve profile');
    }
  },*/

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/auth/logout`);
      setIsAuthenticated(false);
    } catch (error) {
      throw new Error("Failed to logout");
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
