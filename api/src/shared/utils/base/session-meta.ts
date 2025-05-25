import { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import fetch from 'node-fetch';

const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  const remoteAddress = req.socket?.remoteAddress ?? '';
  return remoteAddress.startsWith('::ffff:') ? remoteAddress.slice(7) : remoteAddress;
};

export const createSessionMeta = async (req: Request) => {
  const ip = getClientIp(req);
  const userAgent = req.headers['user-agent'] || '';
  const ua = new UAParser(userAgent).getResult();

  const location: {
    city: string;
    region: string;
    country: string;
  } = { city: '', region: '', country: '' };

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    if (res.ok) {
      const json = await res.json();
      location.city = json?.city ?? '';
      location.region = json?.region ?? '';
      location.country = json?.country ?? '';
    } else {
      console.warn(`GeoIP fetch failed with status: ${res.status}`);
    }
  } catch (err) {
    console.warn('GeoIP fetch error:', err);
  }

  const rawDeviceType = (ua.device?.type ?? 'desktop').toLowerCase();
  const allowedDeviceTypes = ['mobile', 'tablet', 'desktop', 'unknown'] as const;
  const deviceType = allowedDeviceTypes.includes(rawDeviceType as any)
    ? (rawDeviceType as (typeof allowedDeviceTypes)[number])
    : 'unknown';

  return {
    ip,
    location,
    browser: {
      name: ua.browser?.name ?? '',
      version: ua.browser?.version ?? '',
    },
    os: {
      name: ua.os?.name ?? '',
      version: ua.os?.version ?? '',
    },
    deviceType,
    userAgent,
    loginAt: new Date(),
  };
};
