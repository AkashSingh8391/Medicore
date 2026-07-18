import { axiosInstance } from './axiosInstance';
import { ENDPOINTS } from '../../constants/endpoints';

// Set to true only if the backend is temporarily unreachable during
// development — every function below keeps the exact same signature and
// return shape whichever branch runs, so no calling component ever needs
// to change when this flips.
const USE_MOCK = false;

const fakeLatency = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login({ email, password }) {
    if (USE_MOCK) {
      await fakeLatency();
      throw new Error('Mock mode has no backend — flip USE_MOCK to false.');
    }
    // rememberMe is a frontend-only UX flag — the backend schema doesn't
    // accept unknown fields, so only email/password are sent.
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, { email, password });
    return data;
  },

  async register({ fullName, email, phone, role, password }) {
    if (USE_MOCK) {
      await fakeLatency();
      throw new Error('Mock mode has no backend — flip USE_MOCK to false.');
    }
    // confirmPassword/agreeToTerms are validated client-side only and
    // aren't part of the backend's register contract.
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, {
      fullName,
      email,
      phone,
      role,
      password,
    });
    return data;
  },

  async verifyOtp({ email, otp }) {
    if (USE_MOCK) {
      await fakeLatency(500);
      throw new Error('Mock mode has no backend — flip USE_MOCK to false.');
    }
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
    return data;
  },

  async resendOtp({ email }) {
    if (USE_MOCK) {
      await fakeLatency(400);
      return { success: true, message: 'A new OTP has been sent.' };
    }
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.RESEND_OTP, { email });
    return data;
  },

  async forgotPassword({ email }) {
    if (USE_MOCK) {
      await fakeLatency(500);
      return { success: true, message: 'Password reset link sent if the email exists.' };
    }
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return data;
  },

  async resetPassword({ token, newPassword }) {
    if (USE_MOCK) {
      await fakeLatency(500);
      return { success: true, message: 'Password reset successful.' };
    }
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
    return data;
  },

  async logout(refreshToken) {
    if (USE_MOCK) {
      await fakeLatency(200);
      return { success: true };
    }
    const { data } = await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    return data;
  },
};
