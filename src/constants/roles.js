// Central role definitions — used by RoleBasedRoute, sidebars, and API payloads.
// Keeping these as constants (not free strings) means a Spring Boot backend
// can enforce the exact same enum values on the server side.
export const ROLES = Object.freeze({
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
  ADMIN: 'ADMIN',
});

export const ROLE_LABELS = {
  [ROLES.PATIENT]: 'Patient',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.RECEPTIONIST]: 'Receptionist',
  [ROLES.ADMIN]: 'Admin',
};

// Default landing route per role after login
export const ROLE_HOME_ROUTE = {
  [ROLES.PATIENT]: '/patient/dashboard',
  [ROLES.DOCTOR]: '/doctor/dashboard',
  [ROLES.RECEPTIONIST]: '/receptionist/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard',
};
