import type { User as SupabaseUser } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

interface User {
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: User & { password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setLoading(false);
    }
  };

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Try to get profile from database
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
      }

      // Use profile data if available, otherwise use metadata
      setUser({
        fullName: profile?.full_name || supabaseUser.user_metadata?.full_name || '',
        email: supabaseUser.email || '',
        phone: profile?.phone || supabaseUser.user_metadata?.phone || '',
        avatar: profile?.avatar_url || undefined,
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback to metadata
      setUser({
        fullName: supabaseUser.user_metadata?.full_name || '',
        email: supabaseUser.email || '',
        phone: supabaseUser.user_metadata?.phone || '',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user);
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signUp = async (userData: User & { password: string }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            phone: userData.phone,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Try to load the profile, but don't fail if it doesn't exist yet
        try {
          await loadUserProfile(data.user);
        } catch {
          // If profile doesn't exist yet, just use the metadata
          setUser({
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
          });
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();

      if (!supabaseUser) throw new Error('No user logged in');

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: supabaseUser.id,
          full_name: userData.fullName || user?.fullName,
          phone: userData.phone || user?.phone,
          avatar_url: userData.avatar || user?.avatar,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Update local state
      if (user) {
        setUser({ ...user, ...userData });
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      loading,
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
