// auth.ts
export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);

  console.log('Tokens set in localStorage:', {
    accessToken: access,
    refreshToken: refresh,
  });

  // Set token as a cookie (optional for SSR/middleware)
  document.cookie = `accessToken=${access}; path=/; max-age=3600; SameSite=Strict`;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('Access token retrieved from localStorage:', accessToken);
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  console.log('Refresh token retrieved from localStorage:', refreshToken);
  return refreshToken;
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  console.log('Tokens cleared from localStorage and cookies');

  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
