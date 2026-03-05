export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  GOOGLE_LOGIN: '/auth/google-login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  VERIFY_OTP: '/auth/verify-otp',
  RESEND_OTP: '/auth/resend-otp',
  FORCE_LOGIN: '/auth/force-login',
  // GET_USERS: (page: number, search: string, limit: number) =>
  //     `/users?page=${page}&limit=${limit}&search=${search}`,
  GET_USERS: (page: number, search: string, limit: number) =>
    `user/all?page=${page}&limit=${limit}&search=${search}`,
  UPDATE_USER_STATUS: 'user/update-status',
  CONTACT_US: '/contact-us',
  REFRESH_TOKEN: '/auth/refresh',
  USER_PROFILE: '/user/profile',
};

export const QUERY_KEYS = {
  USER_MANAGEMENT_QUERYKEY: 'USER_MANAGEMENT_QUERYKEY',
};
