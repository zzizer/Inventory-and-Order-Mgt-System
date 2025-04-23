import api from '@/services/api';
import { setTokens, clearTokens, getRefreshToken } from './auth';
import { NextRouter } from 'next/router';

// Login Function
interface Credentials {
  email: string;
  password: string;
}

export const login = async (credentials: Credentials, router: NextRouter) => {
  try {
    const response = await api.post('/auth/api/login/', credentials);

    console.log('Full login response:', response);
    console.log('response.data:', response.data);
    console.log('response.data.tokens:', response.data.tokens);

    const access = response.data.tokens?.access;
    const refresh = response.data.tokens?.refresh;

    console.log('Access:', access);
    console.log('Refresh:', refresh);

    setTokens(access, refresh);

    return { success: true };
  } catch (error) {
    const errorMessage = (error as any)?.response?.data || 'Login failed';
    router.push('/auth/login');
    return { success: false, error: errorMessage };
  }
};

// Signup Function
interface UserInfo {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const signup = async (userInfo: UserInfo, router: NextRouter) => {
  try {
    const response = await api.post('/auth/api/signup/', userInfo);
    router.push('/auth/login');
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = (error as any)?.response?.data || 'Signup failed';
    return { success: false, error: errorMessage };
  }
};

export const logout = async () => {
  const refresh = getRefreshToken();
  console.log('Logging out...');
  console.log('Refresh token:', refresh);
  try {
    if (refresh) {
      await api.post('/auth/api/logout/', { refresh });
    }
  } catch (error) {
    console.warn('Logout failed on server, clearing tokens anyway');
  }
  
  // Clear localStorage
  clearTokens();
  
  // Clear the cookie
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // Redirect
  window.location.href = '/auth/login';
};