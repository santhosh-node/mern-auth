import crypto from 'crypto';
import { ENCODING, SALT_LENGTH, HASH_ALGORITHM } from '../../constants';

export class Encrypt {
  private static readonly SALT_LENGTH = SALT_LENGTH;
  private static readonly HASH_ALGORITHM = HASH_ALGORITHM;
  private static readonly ENCODING = ENCODING;

  static hashValue(value: string): { salt: string; hash: string } {
    const salt = crypto.randomBytes(this.SALT_LENGTH).toString(this.ENCODING);
    const hash = crypto.createHmac(this.HASH_ALGORITHM, salt).update(value).digest(this.ENCODING);
    return { salt, hash };
  }

  static hashWithSalt(value: string, salt: string): string {
    return crypto.createHmac(this.HASH_ALGORITHM, salt).update(value).digest(this.ENCODING);
  }

  static compare(value: string, salt: string, hash: string): boolean {
    const hashedValue = this.hashWithSalt(value, salt);
    return hashedValue === hash;
  }

  static generateRandomString(length = 32): string {
    return crypto.randomBytes(length).toString(this.ENCODING);
  }

  static generateRandomDigit(length = 6): string {
    let digits = '';
    while (digits.length < length) {
      const byte = crypto.randomBytes(1)[0];
      if (byte >= 48 && byte <= 57) {
        digits += String.fromCharCode(byte);
      }
    }
    return digits;
  }

  static sha256(value: string): string {
    return crypto.createHash('sha256').update(value).digest(this.ENCODING);
  }
}
