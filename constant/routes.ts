export const APP_ROUTES = {
  PUBLIC_ROUTES: {
    LOGIN: {
      title: 'Login',
      path: '/auth/signin',
    },
    REGISTER: {
      title: 'Register',
      path: '/auth/register',
    },
    VERIFY_OTP: {
      title: 'Verify Otp',
      path: '/auth/verify-otp',
    },
    RESEND_OTP: {
      title: 'Resend Otp',
      path: '/auth/resend-otp',
    },
    HOME: {
      title: 'Home',
      path: '/home',
    },
    CONTACT_US: {
      title: 'Home',
      path: '/home/contact-us',
    },
    ABOUT: {
      title: 'Home',
      path: '/home/about',
    },
  },
  PROTECTED_ROUTES: {
    DASHBOARD: {
      title: 'Dashboard',
      path: '/dashboard',
    },
    USERS_MANAGEMENT: {
      title: 'Users Management',
      path: '/users-management',
    },
    ROLE_MANAGEMENT: {
      title: 'Role Management',
      path: '/role-management',
    },
  },
};
