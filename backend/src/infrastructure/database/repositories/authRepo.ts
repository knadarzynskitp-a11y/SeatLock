import {pool} from '../db.js'
import type {User, emailVerification} from '../../../domain/entities/User.js'
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