import type { newHall, newSeat } from "../../domain/entities/entities.js"

export interface IhallRepository
{
    createHall(hall: newHall): Promise<void>;
}

export interface IseatRepository
{
    createSeats(hallId: number, sector: string, seats: newSeat[]): Promise<void>;
}
