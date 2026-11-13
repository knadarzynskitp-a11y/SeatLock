import type { Event } from '../../../domain/entities/entities.js'
import { NotFoundError } from '../../../application/errors/errors.js'
import type { IeventRepository } from '../../../application/ports/eventPorts.js'
import { pool } from '../db.js'

export const eventRepository: IeventRepository = {
    async createEvent(event) {
        const result = await pool.query(
            `INSERT INTO events (name, price, description, "startDate", "endDate", "hallId")
             SELECT $1, $2, $3, $4, $5, id FROM halls WHERE id = $6 FOR KEY SHARE`,
            [event.name, event.price, event.description, event.startDate, event.endDate, event.hallId]
        )

        if (result.rowCount === 0)
        {
            throw new NotFoundError('Sala nie istnieje')
        }
    },

    async takeEvents() {
        const result = await pool.query<Event>(
            `SELECT * FROM events`
        )

        return result.rows
    },

    async takeEventById(eventId) {
        const result = await pool.query<Event>(
            `SELECT * FROM events WHERE id=$1`,
            [eventId]
        )

        return result.rows[0] ?? null
    }
}
