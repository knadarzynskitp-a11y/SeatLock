import {pool} from '../db.js'
import type {User, emailVerification, ResetPassword, refreshToken} from '../../../domain/entities/User.js'
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
    },

    async createUser(user) {
        await pool.query(
            "INSERT INTO users(name, surname, email, password) VALUES ($1, $2, $3, $4)",
            [user.name, user.surname, user.email, user.password]
        )
    },

    async updateUser(password, user_id) {
        await pool.query(
            "UPDATE users SET password=$1 WHERE user_id =$2",
            [password, user_id]
        )
    },
}

export const refreshTokenRepository: Interfaces.IrefreshTokensRepository = {
    async createRefreshToken(hashedRefreshToken, expires_at, user_id)
    {
        await pool.query(
            "INSERT INTO refreshTokens (user_id, refreshToken, expires_at) VALUES ($1, $2, $3)",
            [user_id, hashedRefreshToken, expires_at]
        );
    },

    async takeRefreshTokenByToken(hashedRefreshToken) {
        const result = await pool.query<refreshToken>(
            "SELECT * FROM refreshTokens WHERE refreshToken=$1",
            [hashedRefreshToken]
        );
        return result.rows[0] ?? null;
    },

    async deleteRefreshTokenByToken(hashedRefreshToken) {
        await pool.query(
            "DELETE FROM refreshTokens WHERE refreshToken=$1",
            [hashedRefreshToken]
        )
    },

    async deleteRefreshTokenById(user_id) {
        await pool.query(
            "DELETE FROM refreshTokens WHERE user_id=$1",
            [user_id]
        )
    }
}

export const emailVerificationRepository: Interfaces.IemailVerificationRepository = {
    async createEmailVerificatonData(name, surname, email, password, code, expires_at) {
        await pool.query(
            "INSERT INTO emailVerification(name, surname, email, password, code, expires_at) VALUES ($1,$2, $3, $4, $5, $6)",
            [name, surname, email, password, code, expires_at]
        );
    }, 
    async deleteEmailVerificationData(email) {
        await pool.query(
            "DELETE FROM emailVerification WHERE email=$1",
            [email]
        )
    },
    async takeEmailVerificationData(email) {
       const result =  await pool.query<emailVerification>(
            "SELECT * FROM emailVerification WHERE email=$1",
            [email]
        )
        return result.rows[0] ?? null;
    },
}

export const createUserTransactionRepository: Interfaces.IcreateUserTransaction = {
    async createUserTransaction(user) {
        const client = await pool.connect();

        try
        {
            await client.query("BEGIN")
            await client.query(
                "DELETE FROM emailVerification WHERE email=$1",
            [user.email]
            );

            await client.query
            (
                "INSERT INTO users(name, surname, email, password) VALUES ($1, $2, $3, $4)",
            [user.name, user.surname, user.email, user.password]
            );

            await client.query("COMMIT")
        }
        catch(err)
        {
            await client.query("ROLLBACK")
            throw err;
        }
        finally
        {
            await client.release()
        }
    },
}

export const resetPasswordRepository: Interfaces.IresetPasswordRepository = {
    async createResetPasswordData(data) {
        await pool.query(
            "INSERT INTO resetPassword (user_id, resetToken, expires_at) VALUES ($1, $2, $3)",
            [data.user_id, data.resetToken, data.expires_at]
        )
    },
    async deleteResetPasswordData(user_id) {
        await pool.query(
            "DELETE FROM resetPassword WHERE user_id=$1",
            [user_id]
        )
    },
    async takeResetPasswordDataByToken(resetToken) {
        const result = await pool.query<ResetPassword>(
            "SELECT * FROM resetPassword WHERE resetToken=$1",
            [resetToken]
        );
        return result.rows[0] ?? null;
    }
}

export const createResetTransactionRepository: Interfaces.IcreateResetTransaction = {
    async createResetTransaction(password, user_id) {
        const client = await pool.connect();

        try
        {
            await client.query("BEGIN");

            await client.query(
                "UPDATE users SET password=$1 WHERE id=$2",
                [password, user_id]
            );

            await client.query(
                "DELETE FROM resetpassword WHERE user_id=$1",
                [user_id]
            );

            await client.query(
                "DELETE FROM refreshtokens WHERE user_id=$1",
                [user_id]
            );

            await client.query("COMMIT")
        }
        catch(err)
        {
            client.query("ROLLBACK");
            throw err;
        }
        finally
        {
            client.release();
        }
    },
}