import { useEffect, useState } from 'react';

export interface GeolocationData {
  city?: string;
  region?: string;
  country?: string;
  ip?: string;
}

export function useIPGeolocation(ip?: string) {
  const [location, setLocation] = useState<GeolocationData | null>(null);

  useEffect(() => {
    if (!ip) return;

    const fetchGeo = async () => {
      try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
        setLocation({
          city: data.city,
          region: data.region,
          country: data.country_name,
          ip: data.ip,
        });
      } catch (error) {
        console.error('Failed to fetch location', error);
      }
    };

    fetchGeo();
  }, [ip]);

  return location;
}
