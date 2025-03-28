import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const userData = { 
      email, 
      name: email.split('@')[0],
      token: Math.random().toString(36).substring(2) // Simple mock token
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  };

  const signup = (email, password) => {
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    const userData = { 
      email, 
      name: email.split('@')[0],
      token: Math.random().toString(36).substring(2) // Simple mock token
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const deleteAccount = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);