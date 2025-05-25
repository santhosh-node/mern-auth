import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '../../constants';

export interface JwtSignPayload {
  userId: string;
  sessionId?: string;
}

export class JWTToken {
  private static accessSecret: string = ACCESS_TOKEN_SECRET;
  private static refreshSecret: string = REFRESH_TOKEN_SECRET;
  private static accessTokenExpiry: SignOptions['expiresIn'] = ACCESS_TOKEN_EXPIRES_IN;
  private static refreshTokenExpiry: SignOptions['expiresIn'] = REFRESH_TOKEN_EXPIRES_IN;

  // Sign Tokens
  private static sign(payload: JwtSignPayload, secret: string, options?: SignOptions): string {
    const finalOptions: SignOptions = {
      expiresIn: options?.expiresIn ?? this.accessTokenExpiry,
      ...options,
    };
    return jwt.sign(payload, secret, finalOptions);
  }

  static signAccessToken(payload: JwtSignPayload): string {
    return this.sign(payload, this.accessSecret, { expiresIn: this.accessTokenExpiry });
  }

  static signRefreshToken(payload: JwtSignPayload): string {
    return this.sign(payload, this.refreshSecret, { expiresIn: this.refreshTokenExpiry });
  }

  // Verify Tokens
  private static verify(token: string, secret: string): string | JwtPayload {
    return jwt.verify(token, secret);
  }

  static verifyAccessToken(token: string): JwtSignPayload {
    return this.verify(token, this.accessSecret) as JwtSignPayload;
  }

  static verifyRefreshToken(token: string): JwtSignPayload {
    return this.verify(token, this.refreshSecret) as JwtSignPayload;
  }

  // Decode Token
  static decode(token: string): string | JwtPayload | null {
    return jwt.decode(token);
  }
}
