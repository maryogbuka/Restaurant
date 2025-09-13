// app/admin/page.jsx - Make sure you have this at the top
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

// Hashed version of your password (SHA-256)
// Replace this with the new hash after generating it
const HASHED_ADMIN_PASSWORD = 'fce98ccaf6962ed4c804ba69bb73c857e012dad71c5a3c9d430be1cf46cf8795';

// Password utility functions
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function verifyPassword(password, hashedPassword) {
  try {
    const testHash = await hashPassword(password);
    return testHash === hashedPassword;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}



export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    
    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
    
    // Check if login is locked from previous attempts
    const lockUntil = localStorage.getItem('loginLockUntil');
    if (lockUntil && new Date().getTime() < parseInt(lockUntil)) {
      setIsLocked(true);
      const remainingTime = Math.ceil((parseInt(lockUntil) - new Date().getTime()) / 1000 / 60);
      toast.error(`Too many failed attempts. Try again in ${remainingTime} minutes.`);
    }
    
    // Get previous login attempts
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    setLoginAttempts(attempts);
  }, [router]);

  // Make sure handleLogin is declared as async
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isClient || isLocked) return;
    
    setIsLoading(true);
    
    try {
      const isValid = await verifyPassword(password, HASHED_ADMIN_PASSWORD);
      
      if (isValid) {
        // Reset attempt counter on successful login
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockUntil');
        setLoginAttempts(0);
        
        // Store admin authentication in sessionStorage
        sessionStorage.setItem('adminAuthenticated', 'true');
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        const attempts = loginAttempts + 1;
        setLoginAttempts(attempts);
        localStorage.setItem('loginAttempts', attempts.toString());
        
        if (attempts >= 5) {
          // Lock for 30 minutes after 5 failed attempts
          const lockUntil = new Date().getTime() + 30 * 60 * 1000;
          localStorage.setItem('loginLockUntil', lockUntil.toString());
          setIsLocked(true);
          toast.error('Too many failed attempts. Try again in 30 minutes.');
        } else {
          toast.error(`Incorrect password. ${5 - attempts} attempts remaining.`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Admin</h1>
          <p className="text-gray-600">Enter your password to access the dashboard</p>
          {isLocked && (
            <p className="text-red-500 text-sm mt-2">
              Account temporarily locked due to too many failed attempts.
            </p>
          )}
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-[#FF4500] transition"
              required
              disabled={isLocked || isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="w-full bg-[#FF4500] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FF4500]/80 focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : isLocked ? 'Account Locked' : 'Login to Dashboard'}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            Forgot the password? Contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}