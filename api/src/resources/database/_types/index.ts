import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  isEmailVerified: boolean;
  passwordHash: string;
  passwordSalt: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum VerificationCodeType {
  EmailVerification = 'email_verification',
  PasswordReset = 'password_reset',
}

export interface VerificationCodeDocument extends Document {
  userId: Types.ObjectId;
  type: VerificationCodeType;
  code: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionDocument extends Document {
  userId: Types.ObjectId;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationCodeResponseDTO {
  id: string;
  userId: string;
  type: VerificationCodeType;
  code: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionResponseDTO {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
