import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortalRole, UserSession } from '../types';

interface AuthContextType {
  user: UserSession | null;
  activePortalRole: PortalRole | null;
  selectedPortalForLogin: PortalRole | null;
  setSelectedPortalForLogin: (role: PortalRole | null) => void;
  login: (role: PortalRole, userDetails?: Partial<UserSession>) => void;
  logout: () => void;
  landingTab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact';
  setLandingTab: (tab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<PortalRole, UserSession> = {
  traveler: {
    id: 'usr-traveler-01',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    role: 'traveler',
    organization: 'Independent Trekker (US Citizen)',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  family: {
    id: 'usr-family-01',
    name: 'David Jenkins',
    email: 'd.jenkins@example.com',
    role: 'family',
    organization: 'Jenkins Emergency Family Safeguard',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  embassy: {
    id: 'usr-embassy-01',
    name: 'Consular Officer Marcus Vance',
    email: 'm.vance@state.gov',
    role: 'embassy',
    organization: 'U.S. Embassy New Delhi - Citizen Services',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  police: {
    id: 'usr-police-01',
    name: 'Inspector R.S. Negi',
    email: 'controlroom@uttarakhandpolice.gov.in',
    role: 'police',
    organization: 'State Emergency Response & Alpine Rescue Command HQ',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('sentinel_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePortalRole, setActivePortalRole] = useState<PortalRole | null>(() => {
    return user ? user.role : null;
  });

  const [selectedPortalForLogin, setSelectedPortalForLogin] = useState<PortalRole | null>(null);
  const [landingTab, setLandingTab] = useState<'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact'>('home');

  useEffect(() => {
    if (user) {
      localStorage.setItem('sentinel_user_session', JSON.stringify(user));
      setActivePortalRole(user.role);
    } else {
      localStorage.removeItem('sentinel_user_session');
      setActivePortalRole(null);
    }
  }, [user]);

  const login = (role: PortalRole, customDetails?: Partial<UserSession>) => {
    const defaultUser = DEMO_USERS[role];
    const newUser: UserSession = {
      ...defaultUser,
      ...customDetails,
      role,
      token: `jwt-token-sentinel-${role}-${Date.now()}`
    };
    setUser(newUser);
    setActivePortalRole(role);
    setSelectedPortalForLogin(null);
  };

  const logout = () => {
    setUser(null);
    setActivePortalRole(null);
    setSelectedPortalForLogin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activePortalRole,
        selectedPortalForLogin,
        setSelectedPortalForLogin,
        login,
        logout,
        landingTab,
        setLandingTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
