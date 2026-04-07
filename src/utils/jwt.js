import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET;
if (!ACCESS_SECRET) throw new Error('JWT_SECRET is not defined');

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined');

export const generateTokens = (userId) => {
    // Access token (short duration)
    const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, {
        expiresIn: '15m'
    });

    // Refresh token (long duration)
    const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
};
