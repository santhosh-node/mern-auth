import { ProfileCard } from '@/components/modules/user/profile-card';
import { SessionsCard } from '@/components/modules/user/sessions-card';
import { GuestWelcome } from '@/components/modules/guest-welcome';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <GuestWelcome />
      <ProfileCard />
      <SessionsCard />
    </div>
  );
}
