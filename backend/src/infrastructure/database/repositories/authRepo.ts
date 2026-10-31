import {pool} from '../db.js'
import type {User} from '../../../domain/entities/User.js'
import type * as Interfaces from '../../../application/ports/authPorts.js'

export const userRepository: Interfaces.IuserRepository = {
    async findByEmail(email)
    {
        const result = await pool.query<User>(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        )
        return result.rows[0] ?? null;
    },

    async findById(user_id)
    {
        const result = await pool.query<User>(
            `SELECT * FROM users WHERE id=$1`,
            [user_id]
        )
        return result.rows[0] ?? null;
    }
}

export const refreshTokenRepository: Interfaces.IrefreshTokensRepository = {
    async createRefreshToken(hashedRefreshToken, expires_at, user_id)
    {
        await pool.query(
            "INSERT INTO refreshTokens (user_id, hashedRefreshToken, expires_at) VALUES ($1, $2, $3)",
            [user_id, hashedRefreshToken, expires_at]
        );
    }
}