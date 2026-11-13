import type { EventDetails, EventListItem } from '../../../domain/entities/entities.js'
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
        const result = await pool.query<EventListItem>(
            `SELECT e.id, e.name, e.price, e."startDate", h.name AS "hallName", h.city AS "hallCity" FROM events AS e
            INNER JOIN halls AS h ON e."hallId" = h.id
            `
        )

        return result.rows
    },

    async takeEventById(eventId) {
        const result = await pool.query<EventDetails>(
            `SELECT e.id, e.name, e.price, e.description, e."startDate", e."endDate", e."hallId", h.name AS "hallName", h.country AS "hallCountry", h."zipCode" AS "hallZipCode", h.city AS "hallCity", h.street AS "hallStreet", h.number AS "hallNumber", h.institution AS "hallInstitution" FROM events AS e INNER JOIN halls AS h ON e."hallId"=h.id WHERE e.id=$1`,
            [eventId]
        )

        return result.rows[0] ?? null
    }
}
