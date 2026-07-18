// Single source of truth for every backend route this frontend expects.
// When the Spring Boot backend is ready, only this file (and env base URL)
// should need to change — no component should hardcode a path string.
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PATIENTS: {
    BASE: '/patients',
    BY_ID: (id) => `/patients/${id}`,
    MEDICAL_HISTORY: (id) => `/patients/${id}/medical-history`,
    PRESCRIPTIONS: (id) => `/patients/${id}/prescriptions`,
    LAB_REPORTS: (id) => `/patients/${id}/lab-reports`,
    DOCUMENTS: (id) => `/patients/${id}/documents`,
  },
  DOCTORS: {
    BASE: '/doctors',
    BY_ID: (id) => `/doctors/${id}`,
    AVAILABILITY: (id) => `/doctors/${id}/availability`,
    SCHEDULE_TODAY: (id) => `/doctors/${id}/schedule/today`,
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_ID: (id) => `/appointments/${id}`,
    CANCEL: (id) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id) => `/appointments/${id}/reschedule`,
  },
  DEPARTMENTS: '/departments',
  HOSPITALS: '/hospitals',
  NOTIFICATIONS: '/notifications',
  ADMIN: {
    STATS: '/admin/stats',
    USERS: '/admin/users',
    ACTIVITY_LOGS: '/admin/activity-logs',
  },
  BILLING: '/billing',
};
