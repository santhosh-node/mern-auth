import { Logo } from '@/components/shared/logo';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="hidden lg:flex flex-1 h-screen bg-muted dark:bg-card items-center justify-center">
        <img src="/chat-green.svg" alt="chat image" className="w-[70%] h-[70%] object-contain m-auto animate-fade-right" />
      </div>
      <div className="flex-1 min-h-screen flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <ThemeSwitcher />
        </div>
        <div className="flex-1 flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
