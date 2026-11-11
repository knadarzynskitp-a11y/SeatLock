import type { newEvent } from '../../domain/entities/entities.js'

export interface IeventRepository
{
    createEvent(event: newEvent): Promise<void>
}
