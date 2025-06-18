import { useState, useEffect } from 'react';
import { authHelpers, User } from '../lib/pocketbase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = authHelpers.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const result = await authHelpers.login(email, password);
    if (result.success) {
      setUser(result.user as User);
    }
    setLoading(false);
    return result;
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
  }) => {
    setLoading(true);
    const result = await authHelpers.register(data);
    if (result.success) {
      setUser(result.user as User);
    }
    setLoading(false);
    return result;
  };

  const logout = () => {
    authHelpers.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};