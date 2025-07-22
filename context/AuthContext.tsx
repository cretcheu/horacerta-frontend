import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({}); // opcional: buscar /auth/me
    }
  }, []);

  async function login(email: string, password: string) {
    // Tipagem da resposta com access_token
    const res = await api.post<{ access_token: string }>('/auth/login', { email, password });
    const accessToken = res.data.access_token;
    localStorage.setItem('token', accessToken);
    setUser({ email });
  }

  async function register(data: { name: string; email: string; password: string }) {
    await api.post('/auth/register', data);
    await login(data.email, data.password);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}