export interface UserResponse {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionResponse {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
