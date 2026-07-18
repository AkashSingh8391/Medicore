import {
  FiGrid, FiCalendar, FiSearch, FiFileText, FiUpload, FiCreditCard,
  FiBell, FiHeart, FiStar, FiUser, FiUsers, FiClipboard, FiActivity,
  FiPieChart, FiSettings, FiList, FiClock, FiMap,
} from 'react-icons/fi';
import { ROLES } from './roles';

// Drives the sidebar per role. Route paths mirror the folder-per-feature
// structure under src/features/*, so wiring a new page later is additive.
export const NAVIGATION = {
  [ROLES.PATIENT]: [
    { label: 'Dashboard', icon: FiGrid, to: '/patient/dashboard' },
    { label: 'Appointments', icon: FiCalendar, to: '/patient/appointments' },
    { label: 'Find Doctors', icon: FiSearch, to: '/patient/doctors' },
    { label: 'Medical History', icon: FiFileText, to: '/patient/medical-history' },
    { label: 'Lab Reports', icon: FiActivity, to: '/patient/lab-reports' },
    { label: 'Documents', icon: FiUpload, to: '/patient/documents' },
    { label: 'Payments', icon: FiCreditCard, to: '/patient/payments' },
    { label: 'Favourite Doctors', icon: FiStar, to: '/patient/favourites' },
    { label: 'Notifications', icon: FiBell, to: '/patient/notifications' },
    { label: 'Profile', icon: FiUser, to: '/patient/profile' },
  ],
  [ROLES.DOCTOR]: [
    { label: 'Dashboard', icon: FiGrid, to: '/doctor/dashboard' },
    { label: "Today's Schedule", icon: FiClock, to: '/doctor/schedule' },
    { label: 'Patient Queue', icon: FiUsers, to: '/doctor/queue' },
    { label: 'Appointments', icon: FiCalendar, to: '/doctor/appointments' },
    { label: 'Patients', icon: FiClipboard, to: '/doctor/patients' },
    { label: 'Availability', icon: FiCalendar, to: '/doctor/availability' },
    { label: 'Analytics', icon: FiPieChart, to: '/doctor/analytics' },
    { label: 'Notifications', icon: FiBell, to: '/doctor/notifications' },
    { label: 'Profile', icon: FiUser, to: '/doctor/profile' },
  ],
  [ROLES.RECEPTIONIST]: [
    { label: 'Dashboard', icon: FiGrid, to: '/receptionist/dashboard' },
    { label: 'Book Appointment', icon: FiCalendar, to: '/receptionist/book-appointment' },
    { label: 'Walk-in Patient', icon: FiUsers, to: '/receptionist/walk-in' },
    { label: 'Registration', icon: FiClipboard, to: '/receptionist/registration' },
    { label: 'Billing', icon: FiCreditCard, to: '/receptionist/billing' },
    { label: 'Queue', icon: FiList, to: '/receptionist/queue' },
    { label: 'Calendar', icon: FiCalendar, to: '/receptionist/calendar' },
    { label: 'Search Patient', icon: FiSearch, to: '/receptionist/search' },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', icon: FiGrid, to: '/admin/dashboard' },
    { label: 'Statistics', icon: FiPieChart, to: '/admin/statistics' },
    { label: 'Doctors', icon: FiUsers, to: '/admin/doctors' },
    { label: 'Patients', icon: FiUsers, to: '/admin/patients' },
    { label: 'Departments', icon: FiMap, to: '/admin/departments' },
    { label: 'Revenue', icon: FiCreditCard, to: '/admin/revenue' },
    { label: 'Reports', icon: FiFileText, to: '/admin/reports' },
    { label: 'User Management', icon: FiUser, to: '/admin/users' },
    { label: 'Activity Logs', icon: FiActivity, to: '/admin/activity-logs' },
    { label: 'Settings', icon: FiSettings, to: '/admin/settings' },
  ],
};
