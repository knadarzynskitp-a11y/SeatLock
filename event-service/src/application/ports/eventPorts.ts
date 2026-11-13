import type { Event, newEvent } from '../../domain/entities/entities.js'

export interface IeventRepository
{
    createEvent(event: newEvent): Promise<void>
    takeEvents(): Promise<Event[]>
}
