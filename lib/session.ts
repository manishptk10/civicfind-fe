export const setSessionEmail = (email: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('auth_email', email);
  }
};

export const getSessionEmail = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('auth_email');
  }
  return null;
};

export const clearSessionEmail = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('auth_email');
  }
};
