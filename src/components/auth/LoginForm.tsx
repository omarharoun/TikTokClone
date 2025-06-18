import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Button
            variant="ghost"
            onClick={onSwitchToRegister}
            className="text-[#fe2c55] hover:text-[#fe2c55]/90 p-0 h-auto bg-transparent hover:bg-transparent"
          >
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
};