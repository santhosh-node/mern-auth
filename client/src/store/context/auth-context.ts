import { createContext } from 'react';
import { UserResponse, SessionResponse } from '@/types/models';

export interface AuthContextType {
  user: UserResponse | null;
  sessions: SessionResponse[];
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
  refreshSessions: () => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
