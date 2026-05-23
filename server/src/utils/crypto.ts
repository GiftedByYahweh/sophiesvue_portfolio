import nodeCrypto from 'node:crypto';

const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };

const hash = (value: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const salt = nodeCrypto.randomBytes(16).toString('base64');
    nodeCrypto.scrypt(value, salt, 64, SCRYPT_PARAMS, (err, result) => {
      if (err) return reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });

const verify = (hashedValue: string, value: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const [salt, hashed] = hashedValue.split(':');
    if (!salt || !hashed) return resolve(false);
    nodeCrypto.scrypt(value, salt, 64, SCRYPT_PARAMS, (err, result) => {
      if (err) return reject(err);
      const hashedBuf = Buffer.from(hashed, 'base64');
      if (hashedBuf.length !== result.length) return resolve(false);
      resolve(nodeCrypto.timingSafeEqual(hashedBuf, result));
    });
  });

const getRandomId = () => nodeCrypto.randomUUID();

const generateToken = (length = 8) => {
  const chars = 'AaBbCcDdEeFfGgHhJjKkLlMmNnPpQqRrSsTtUuVvWwXxYyZz23456789';
  const bytes = nodeCrypto.randomBytes(length);
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
};

export const crypto = { hash, verify, getRandomId, generateToken };
