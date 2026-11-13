import type { EventDetails, EventListItem, newEvent } from '../../domain/entities/entities.js'

export interface IeventRepository
{
    createEvent(event: newEvent): Promise<void>
    takeEvents(): Promise<EventListItem[]>
    takeEventById(eventId: number): Promise<EventDetails | null>
}
