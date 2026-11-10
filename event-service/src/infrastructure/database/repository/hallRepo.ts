import {pool} from '../db.js'
import * as Interfaces from '../../../application/ports/hallPorts.js'

export const hallRepository: Interfaces.IhallRepository = {
    async createHall(hall) {
        await pool.query(
            "INSERT INTO halls (name, country, zipCode, city, street, number, institution) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [hall.name, hall.country, hall.zipCode, hall.city, hall.street, hall.number, hall.institution]
        )
    },
}