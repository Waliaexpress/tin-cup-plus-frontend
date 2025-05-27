"use client";

import { useEffect, useState, useLayoutEffect } from 'react';
import { useGetUserInfoQuery } from '@/store/services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '@/store/slices/auth.slice';
import { usePathname, useRouter } from 'next/navigation';
import { X, AlertCircle, Loader } from 'lucide-react';

const AuthCheck = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [showAdminAuthMessage, setShowAdminAuthMessage] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [adminAuthChecking, setAdminAuthChecking] = useState(false);

  useLayoutEffect(() => {
    if (pathname?.startsWith('/admin')) {
      const isAdmin = isAuthenticated && user && 
                     user.role && 
                     typeof user.role === 'string' && 
                     user.role.toLowerCase().trim() === 'admin';
      
      if (isAdmin) {
        console.log('Admin already verified in Redux', user); 
        setShowAdminAuthMessage(false);
      } else {
        console.log('Showing auth message, checking admin status'); 
        setShowAdminAuthMessage(true);
        setAdminAuthChecking(true);
      }
    } else {
      setShowAdminAuthMessage(false);
      setAccessDenied(false);
      setAdminAuthChecking(false);
    }
  }, [pathname, isAuthenticated, user]);
  
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('tin-cup-token');
      setToken(accessToken);
      
      if (pathname?.startsWith('/admin') && !accessToken) {
        setToken('');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setToken(null);
    }
  }, [pathname]);

  const { data, error, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !pathname?.startsWith('/admin') && !token,
    pollingInterval: 5 * 60 * 1000,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!pathname?.startsWith('/admin') || !data) return;
    
    console.log('Auth check data:', data); 
    setAdminAuthChecking(false);
    
    const userRole = data.data?.role;
    const isAdmin = userRole && typeof userRole === 'string' && userRole.toLowerCase().trim() === 'admin';
    
    if (isAdmin) {
      setShowAdminAuthMessage(false);
      setAccessDenied(false);
      if (data.success && data.data) {
        dispatch(setUser(data.data));
      }
    } else {
      console.log('Access denied. User role:', userRole); 
      setAccessDenied(true);
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, data, router, dispatch]);

  useEffect(() => {
    if (data && data.success) {
      dispatch(setUser(data.data));
      
      if (pathname?.startsWith('/admin') && data.data?.role && 
          typeof data.data.role === 'string' && 
          data.data.role.toLowerCase().trim() === 'admin') {
        setShowAdminAuthMessage(false);
        setAccessDenied(false);
        setAdminAuthChecking(false);
      }
    } else if (error) {
      console.error('Error fetching user info:', error);
      dispatch(clearUser());
      
      if (error && 'status' in error && (error.status === 401 || error.status === 403)) {
        try {
          localStorage.removeItem('tin-cup-token');
        } catch (e) {
          console.error('Error removing token from localStorage:', e);
        }
        
        if (pathname?.startsWith('/admin')) {
          router.push('/');
        }
      }
    }
  }, [data, error, dispatch, pathname, router]);
  if (showAdminAuthMessage) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          {accessDenied ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <X className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You don't have permission to access the admin area.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to home page...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  {adminAuthChecking ? (
                    <Loader className="h-8 w-8 text-blue-600 animate-spin" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                  )}
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Authenticating</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Verifying your admin credentials...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

export default AuthCheck;
