import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET;
if (!ACCESS_SECRET) throw new Error('JWT_SECRET is not defined');

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined');

export const generateTokens = (userId) => {
    // Trim secrets to avoid issues
    const secret = ACCESS_SECRET.trim();
    const refreshSecret = REFRESH_SECRET.trim();

    // Access token (short duration)
    const accessToken = jwt.sign({ id: userId }, secret, {
        expiresIn: '15m'
    });

    // Refresh token (long duration)
    const refreshToken = jwt.sign({ id: userId }, refreshSecret, {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
};
