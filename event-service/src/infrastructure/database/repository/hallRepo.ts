import {pool} from '../db.js'
import * as Interfaces from '../../../application/ports/hallPorts.js'
import { ConflictError, NotFoundError } from '../../../application/errors/errors.js'

export const hallRepository: Interfaces.IhallRepository = {
    async createHall(hall) {
        await pool.query(
            `INSERT INTO halls (name, country, "zipCode", city, street, number, institution) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [hall.name, hall.country, hall.zipCode, hall.city, hall.street, hall.number, hall.institution]
        )
    },
}

export const seatRepository: Interfaces.IseatRepository = {
    async createSeats(hallId, sector, seats) {
        const client = await pool.connect();

        try
        {
            await client.query("BEGIN");

            const hall = await client.query(
                "SELECT id FROM halls WHERE id=$1 FOR UPDATE",
                [hallId]
            );

            if (hall.rowCount === 0)
            {
                throw new NotFoundError("Sala nie istnieje");
            }

            const existingSeats = await client.query(
                `SELECT 1 FROM seats WHERE "hallId"=$1 AND sector=$2 LIMIT 1`,
                [hallId, sector]
            );

            if (existingSeats.rowCount !== 0)
            {
                throw new ConflictError("Ten sektor ma już dodane miejsca");
            }

            await client.query(
                `INSERT INTO seats ("hallId", sector, row, "seatNumber")
                 SELECT $1, $2, row_number, seat_number
                 FROM unnest($3::int[], $4::int[]) AS positions(row_number, seat_number)`,
                [hallId, sector, seats.map(seat => seat.row), seats.map(seat => seat.seatNumber)]
            );

            await client.query("COMMIT");
        }
        catch (err)
        {
            await client.query("ROLLBACK");
            throw err;
        }
        finally
        {
            client.release();
        }
    }
}
