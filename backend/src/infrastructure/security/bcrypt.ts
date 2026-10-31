import bcrypt from 'bcrypt'
import type { IpasswordHasher } from '../../application/ports/authPorts.js'

export const bcryptPasswordHasher: IpasswordHasher = {
    async compare(password, passwordHash)
    {
        return bcrypt.compare(password, passwordHash)
    }
}