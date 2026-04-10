import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-bold tracking-tight mb-6 inline-block">LUXE</Link>
          <h2 className="text-3xl font-extrabold text-black">Welcome back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-gray-200 border border-gray-100">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-12 focus:ring-2 focus:ring-black transition-all"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-4.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between px-1 mb-2">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-accent">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-12 focus:ring-2 focus:ring-black transition-all"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-4.5 h-5 w-5 text-gray-400" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4.5 text-gray-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-80 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <span>Signing in...</span> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? <Link to="/register" className="text-black font-bold">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
