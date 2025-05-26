import jwt from 'jsonwebtoken';

export function generateClientSecret() {
  const privateKey = process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iss: process.env.APPLE_TEAM_ID, // Your Apple Team ID
      iat: now,
      exp: now + 15777000, // ~6 months max
      aud: 'https://appleid.apple.com',
      sub: process.env.APPLE_SERVICE_ID, // Your Service ID / Client ID
    },
    privateKey,
    {
      algorithm: 'ES256',
      keyid: process.env.APPLE_KEY_ID, // Key ID in header
    }
  );
}
