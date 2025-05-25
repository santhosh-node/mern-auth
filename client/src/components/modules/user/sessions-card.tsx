'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { UAParser } from 'ua-parser-js';

import { ChromeIcon } from '@/components/icons/chrome-icon';
import { FirefoxIcon } from '@/components/icons/firefox-icon';
import { SafariIcon } from '@/components/icons/safari-icon';
import { EdgeIcon } from '@/components/icons/edge-icon';
import { OperaIcon } from '@/components/icons/opera-icon';
import { InternetExplorerIcon } from '@/components/icons/internet-explorer-icon';
import { BraveIcon } from '@/components/icons/brave-icon';
import { ViavaldiIcon } from '@/components/icons/viavaldi-icon';
import { WindowsIcon } from '@/components/icons/windows-icon';
import { AppleIcon } from '@/components/icons/apple-icon';
import { LinuxIcon } from '@/components/icons/linux-icon';
import { AndroidIcon } from '@/components/icons/android-icon';
import { PostmanIcon } from '@/components/icons/postman-icon';
import { GlobeIcon, MonitorIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface GeolocationData {
  city?: string;
  region?: string;
  country?: string;
  ip?: string;
}

export function SessionsCard() {
  const { sessions, deleteSession, loading, user } = useAuth();
  const [locations, setLocations] = useState<Record<string, GeolocationData>>({});

  useEffect(() => {
    const fetchLocations = async () => {
      const newLocations: Record<string, GeolocationData> = { ...locations };

      await Promise.all(
        sessions.map(async ({ ipAddress }) => {
          if (!ipAddress || newLocations[ipAddress]) return;

          try {
            const res = await fetch(`https://ipapi.co/${ipAddress}/json/`);
            const data = await res.json();
            console.log(`Geolocation for ${ipAddress}:`, data);

            newLocations[ipAddress] = {
              city: data.city,
              region: data.region,
              country: data.country_name,
              ip: data.ip,
            };
          } catch (error) {
            console.log(`Failed to fetch location for ${ipAddress}`, error);
          }
        })
      );

      setLocations(newLocations);
    };

    if (sessions.length) {
      fetchLocations();
    }
  }, [sessions]);

  if (!user) return null;

  if (loading)
    return (
      <div className="flex justify-center items-center py-8">
        <p>Loading sessions...</p>
      </div>
    );

  if (!sessions.length) return <div className="text-center py-8 text-muted-foreground">No active sessions found.</div>;

  const formatDate = (dateStr: string | Date) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // Map browser names to icons
  const browserIconMap: Record<string, React.JSX.Element> = {
    Chrome: <ChromeIcon className="h-6 w-6" />,
    Firefox: <FirefoxIcon className="h-6 w-6" />,
    Safari: <SafariIcon className="h-6 w-6" />,
    Edge: <EdgeIcon className="h-6 w-6" />,
    Opera: <OperaIcon className="h-6 w-6" />,
    IE: <InternetExplorerIcon className="h-6 w-6" />,
    Brave: <BraveIcon className="h-6 w-6" />,
    Vivaldi: <ViavaldiIcon className="h-6 w-6" />,
    Postman: <PostmanIcon className="h-6 w-6" />,
  };

  // Map OS names to icons
  const osIconMap: Record<string, React.JSX.Element> = {
    Windows: <WindowsIcon className="h-6 w-6" />,
    Mac: <AppleIcon className="h-6 w-6" />,
    'Mac OS': <AppleIcon className="h-6 w-6" />,
    Linux: <LinuxIcon className="h-6 w-6" />,
    Android: <AndroidIcon className="h-6 w-6" />,
    iOS: <AppleIcon className="h-6 w-6" />,
  };

  const parseUserAgent = (uaString?: string) => {
    let browserName = '';
    let browserVersion = '';
    let osName = '';

    if (!uaString)
      return {
        browserName,
        browserVersion,
        osName,
      };

    // Detect Postman explicitly
    if (uaString.includes('PostmanRuntime')) {
      return {
        browserName: 'Postman',
        browserVersion: '',
        osName: 'Unknown OS',
      };
    }

    const parser = new UAParser(uaString);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    browserName = browser.name || 'Unknown browser';
    browserVersion = browser.version ? ` v${browser.version}` : '';
    osName = os.name || 'Unknown OS';

    return {
      browserName,
      browserVersion,
      osName,
    };
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="border-b gap-0 px-5 [.border-b]:pb-4">
        <CardTitle className="text-lg">Device Management</CardTitle>
        <CardDescription>Manage which devices can access your account.</CardDescription>
      </CardHeader>
      <CardContent className="px-5">
        <ul className="flex flex-col gap-6">
          {sessions.map(({ id, userAgent, ipAddress, createdAt, expiresAt }) => {
            const { browserName, osName } = parseUserAgent(userAgent);
            const OsIcon = osIconMap[osName] || <MonitorIcon className="h-6 w-6 text-muted-foreground" />;
            const BrowserIcon = browserIconMap[browserName] || <GlobeIcon className="h-6 w-6 text-muted-foreground" />;
            const location = ipAddress ? locations[ipAddress] : null;
            const isPrivateIP = ipAddress?.startsWith('192.') || ipAddress === '127.0.0.1' || ipAddress === '::1';

            return (
              <li key={id} className="flex-1 flex justify-between gap-3 items-start rounded-md ">
                <div className="flex-1 flex items-center justify-center bg-muted/80 rounded-full w-auto aspect-square p-0.5">
                  {osName === 'Unknown OS' ? BrowserIcon : OsIcon}
                </div>
                <div className="flex-5 flex flex-col gap-0.5 w-full h-full">
                  <p className="font-semibold text-base">{osName === 'Unknown OS' ? browserName : osName}</p>
                  {!isPrivateIP && location?.city && location?.region && location?.country ? (
                    <p className="text-xs text-muted-foreground">
                      Location: {location.city}, {location.region}, {location.country}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Location: Localhost</p>
                  )}
                  <p className="text-xs text-muted-foreground">Created: {formatDate(createdAt)}</p>
                  <p className="text-xs text-muted-foreground">Expires: {formatDate(expiresAt)}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSession(id)}
                  aria-label={`Log out session on ${userAgent || 'device'}`}
                >
                  Logout
                </Button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
