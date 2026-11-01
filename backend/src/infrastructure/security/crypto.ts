import crypto from 'crypto'
import type { Icrypto } from '../../application/ports/authPorts.js'

export const cryptoNumber: Icrypto = {
    async randomInt(number1, number2) {
        return crypto.randomInt(number1, number2).toString()
    }
}