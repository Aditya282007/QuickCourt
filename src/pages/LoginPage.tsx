import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Upload } from 'lucide-react';
import { login, signup } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    avatar: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const authPromise = isLogin 
      ? login(formData.email, formData.password)
      : signup(formData.name, formData.email, formData.password, formData.role as 'user' | 'owner', formData.avatar);

    authPromise
      .then((user) => {
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'owner') {
          navigate('/venues');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        setError(error.message || 'Authentication failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Quick login functions for demo
  const quickLogin = (email: string, password: string) => {
    setFormData({ ...formData, email, password });
    setError('');
    setLoading(true);

    login(email, password)
      .then((user) => {
        if (isLogin) {
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'owner') {
            navigate('/venues');
          } else {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        setError(error.message || 'Login failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold text-white mb-2">
              Quick<span className="text-[#C5A880]">Court</span>
            </div>
          </Link>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          {/* Admin Login Hint
          {isLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-xl p-4 mb-6"
            >
              <h4 className="text-[#C5A880] font-medium mb-2">Admin Access</h4>
              <p className="text-gray-300 text-sm mb-2">
                Use these credentials to access the admin dashboard:
              </p>
              <div className="text-sm space-y-1">
                <p className="text-gray-400">Email: <span className="text-white font-mono">admin@gmail.com</span></p>
                <p className="text-gray-400">Password: <span className="text-white font-mono">admin@123</span></p>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => quickLogin('admin@gmail.com', 'admin@123')}
                disabled={loading}
                className="mt-3 w-full bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 rounded-lg py-2 text-sm hover:bg-[#C5A880]/30 transition-colors disabled:opacity-50"
              >
                Quick Admin Login
              </motion.button>
            </motion.div>
          )} */}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (only for signup) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Avatar field (only for signup) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-gray-300 text-sm mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  {formData.avatar && (
                    <img
                      src={formData.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880]/30"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{formData.avatar ? 'Change Picture' : 'Upload Picture'}</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Role selector (only for signup) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-gray-300 text-sm mb-2">I am a</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                >
                  <option value="user" className="bg-gray-900">Player (Book Venues)</option>
                  <option value="owner" className="bg-gray-900">Venue Owner</option>
                </select>
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle between login/signup */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C5A880] hover:text-[#D4B897] transition-colors font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;