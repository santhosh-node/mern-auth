'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';

export function GuestWelcome() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-black mb-5">Welcome</h2>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
