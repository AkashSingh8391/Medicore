import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';
import { ROLES } from '../constants/roles';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { OtpVerificationPage } from '../features/auth/pages/OtpVerificationPage';

import { PatientDashboardPage } from '../features/patient/pages/PatientDashboardPage';
import { DoctorDashboardPage } from '../features/doctor/pages/DoctorDashboardPage';
import { ReceptionistDashboardPage } from '../features/receptionist/pages/ReceptionistDashboardPage';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';

import { NotFoundPage } from '../pages/NotFoundPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { ServerErrorPage } from '../pages/ServerErrorPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Patient */}
          <Route element={<RoleBasedRoute allowedRoles={[ROLES.PATIENT]} />}>
            <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
            {/* Additional patient feature routes are added here in Phase 2,
                one folder at a time (appointments, doctors, medical-history...) */}
          </Route>

          {/* Doctor */}
          <Route element={<RoleBasedRoute allowedRoles={[ROLES.DOCTOR]} />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
          </Route>

          {/* Receptionist */}
          <Route element={<RoleBasedRoute allowedRoles={[ROLES.RECEPTIONIST]} />}>
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboardPage />} />
          </Route>

          {/* Admin */}
          <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Route>
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Error pages */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
