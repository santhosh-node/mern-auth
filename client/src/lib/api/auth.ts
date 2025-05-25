import { SessionResponse, UserResponse } from '@/types/models';
import { axiosClient } from '../axios/axios-client';
import { SignInDTO, SignUpDTO, ForgotPasswordDTO, ResetPasswordDTO, VerifyEmailDTO } from '../validations/auth';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
}

// Sign In
export const signInAPI = async (data: SignInDTO) => {
  const res = await axiosClient.post('/auth/sign-in', data);
  return res.data;
};

// Sign Up
export const signUpAPI = async (data: SignUpDTO) => {
  const res = await axiosClient.post('/auth/sign-up', data);
  return res.data;
};

// Sign Out
export const signOutAPI = async () => {
  const res = await axiosClient.post('/auth/sign-out');
  return res.data;
};

// Forgot Password
export const forgotPasswordAPI = async (data: ForgotPasswordDTO) => {
  const res = await axiosClient.post('/auth/forgot-password', data);
  return res.data;
};

// Reset Password
export const resetPasswordAPI = async (data: ResetPasswordDTO) => {
  const res = await axiosClient.post('/auth/reset-password', data);
  return res.data;
};

// Verify Email
export const verifyEmailAPI = async (data: VerifyEmailDTO) => {
  const res = await axiosClient.post('/auth/verify-email', data);
  return res.data;
};

// Get Current User
export const getCurrentUserAPI = async (): Promise<UserResponse> => {
  const res = await axiosClient.get<ApiResponse<UserResponse>>('/auth/me');
  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch user');
  }
  return res.data.data;
};

// Fetch sessions for current user
export const getSessionsAPI = async (): Promise<SessionResponse[]> => {
  const res = await axiosClient.get<ApiResponse<SessionResponse[]>>('/sessions');
  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch sessions');
  }
  return res.data.data;
};

// Delete a session by ID
export const deleteSessionAPI = async (sessionId: string): Promise<void> => {
  const res = await axiosClient.delete<ApiResponse<null>>(`/sessions/${sessionId}`);
  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to delete session');
  }
};
