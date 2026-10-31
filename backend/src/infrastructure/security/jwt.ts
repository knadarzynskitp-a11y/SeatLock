import jwt from 'jsonwebtoken'
import type { ItokenGeneration } from '../../application/ports/authPorts.js'
import crypto from 'crypto'

export const generateTokens: ItokenGeneration = {
    async generateTokens(payload) {
        //generujemy tokeny
        const accessToken = jwt.sign(
            {user_id: payload.user_id, role: payload.role}, 
            process.env.JWT_SECRET!,
            {expiresIn: '15m'}
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const hashedRefreshToken = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');
        const expires_at = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

        return{
            accessToken,
            refreshToken,
            hashedRefreshToken,
            expires_at
        }
    },
}