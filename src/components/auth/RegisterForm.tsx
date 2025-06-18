import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    
    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Join TikTok</h1>
        <p className="text-gray-400">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Choose a username"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Create a password"
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161823] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55]"
            placeholder="Confirm your password"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Button
            variant="ghost"
            onClick={onSwitchToLogin}
            className="text-[#fe2c55] hover:text-[#fe2c55]/90 p-0 h-auto bg-transparent hover:bg-transparent"
          >
            Sign in
          </Button>
        </p>
      </div>
    </div>
  );
};