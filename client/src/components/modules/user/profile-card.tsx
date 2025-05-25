'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOutAPI } from '@/lib/api/auth';

export function ProfileCard() {
  const { user, refreshUser } = useAuth();

  if (!user) return null;

  const createdDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="max-w-md w-full">
      <div className="mx-auto">
        <Avatar className="size-20">
          <AvatarImage src={user.avatar || ''} />
          <AvatarFallback className="border">CN</AvatarFallback>
        </Avatar>
      </div>

      <CardHeader className="text-center">
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 text-center text-sm text-muted-foreground">
        <p>
          Email Verified:{' '}
          <span aria-label={user.isEmailVerified ? 'Verified' : 'Not Verified'}>{user.isEmailVerified ? '✅ Yes' : '❌ No'}</span>
        </p>
        <p>Account Created: {createdDate}</p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={async () => {
            await signOutAPI();
            await refreshUser();
          }}
          variant="destructive"
          className="mx-auto"
        >
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
