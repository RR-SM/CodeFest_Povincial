import React, { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (userData: User & { password: string }) => void;
  signOut: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string) => {
    // Mock sign in - in real app, this would call an API
    setUser({
      fullName: "John Doe",
      email: email,
      phone: "+977 9812345678",
    });
  };

  const signUp = (userData: User & { password: string }) => {
    // Mock sign up - in real app, this would call an API
    const { password, ...userInfo } = userData;
    setUser(userInfo);
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
