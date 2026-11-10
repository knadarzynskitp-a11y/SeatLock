import { newHall } from "../../domain/entities/entities.js"

export interface IhallRepository
{
    createHall(hall: newHall): Promise<void>;
}