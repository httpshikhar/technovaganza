import React, { useState } from 'react';
import Login from '../components/auth/Login.jsx';
import Register from '../components/auth/Register.jsx';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-background-dark/50 rounded-xl shadow-2xl shadow-primary/20 border border-white/10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Technovaganza 2025</h1>
          <p className="mt-2 text-sm text-gray-400">SRMS CET&R - Annual Technical Festival</p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        {/* Tab Navigation */}
        <div>
          <div className="flex border-b border-gray-700">
            <button 
              className={`w-1/2 py-4 px-1 text-center text-sm font-medium border-b-2 transition-colors ${
                isLogin 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-primary/50'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`w-1/2 py-4 px-1 text-center text-sm font-medium border-b-2 transition-colors ${
                !isLogin 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-primary/50'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>

        {/* Auth Forms */}
        <div>
          {isLogin ? (
            <Login switchToRegister={() => setIsLogin(false)} />
          ) : (
            <Register switchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;