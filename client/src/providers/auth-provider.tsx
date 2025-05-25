import { useEffect, useState, ReactNode } from 'react';
import { getCurrentUserAPI, getSessionsAPI, deleteSessionAPI } from '@/lib/api/auth';
import { UserResponse, SessionResponse } from '@/types/models';
import { AuthContext } from '@/store/context/auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await getCurrentUserAPI();
      setUser(userData);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const sessionsData = await getSessionsAPI();
      setSessions(sessionsData);
    } catch (err) {
      setSessions([]);
      setError(err instanceof Error ? err : new Error('Failed to fetch sessions'));
    }
  };

  const removeSession = async (sessionId: string) => {
    try {
      await deleteSessionAPI(sessionId);
      // Refresh sessions list after deletion
      await fetchSessions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete session'));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSessions();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        sessions,
        loading,
        error,
        refreshUser: fetchUser,
        refreshSessions: fetchSessions,
        deleteSession: removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
