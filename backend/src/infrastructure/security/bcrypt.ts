import bcrypt from 'bcrypt'
import type { IpasswordHasher } from '../../application/ports/authPorts.js'

export const passwordHasher: IpasswordHasher = {
    async compare(password, passwordHash)
    {
        return await bcrypt.compare(password, passwordHash)
    },

    async hash(password)
    {
        return await bcrypt.hash(password, 10);
    }

}