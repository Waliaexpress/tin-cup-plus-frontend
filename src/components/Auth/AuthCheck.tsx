"use client";

import { useEffect, useState } from 'react';
import { useGetUserInfoQuery } from '@/store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/store/slices/auth.slice';
import { usePathname, useRouter } from 'next/navigation';

const AuthCheck = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('tin-cup-token');
      setToken(accessToken);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setToken(null);
    }
  }, []);

  const { data, error, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !token,
    pollingInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (pathname?.startsWith('/admin') && data) {
      if (data.data?.role !== 'admin') {
        router.push('/');
      }
    }
  }, [pathname, data, router]);

  useEffect(() => {
    if (data && data.success) {
      dispatch(setUser(data.data));
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
  return null;
};

export default AuthCheck;
