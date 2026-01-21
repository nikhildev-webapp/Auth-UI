import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retrieve all registered users
    const usersJson = localStorage.getItem('authUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user with matching email and password
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const loggedInUser: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem('authUser', JSON.stringify(loggedInUser));
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate inputs
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    // Get existing users
    const usersJson = localStorage.getItem('authUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, never store plain passwords!
    };

    users.push(newUser);
    localStorage.setItem('authUsers', JSON.stringify(users));

    // Auto-login after registration
    const loggedInUser: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem('authUser', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
