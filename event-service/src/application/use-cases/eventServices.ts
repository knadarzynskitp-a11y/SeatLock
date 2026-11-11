import type { newEvent } from '../../domain/entities/entities.js'
import { ValidationError } from '../errors/errors.js'
import type { IeventRepository } from '../ports/eventPorts.js'

export async function createEventService(
    name: string,
    price: string,
    description: string | undefined,
    startDate: string,
    endDate: string,
    hallId: number,
    eventRepository: IeventRepository
)
{
    if (typeof name !== 'string' || !name.trim())
    {
        throw new ValidationError('Podaj nazwę wydarzenia')
    }

    if (typeof price !== 'string' || !/^\d+(?:[.,]\d{1,2})?$/.test(price.trim()))
    {
        throw new ValidationError('Podaj cenę od 0 z maksymalnie dwoma miejscami po przecinku')
    }

    if (description !== undefined && typeof description !== 'string')
    {
        throw new ValidationError('Opis wydarzenia musi być tekstem')
    }

    if (!Number.isInteger(hallId) || hallId < 1 || hallId > 2147483647)
    {
        throw new ValidationError('Podaj prawidłowe ID sali')
    }

    if (typeof startDate !== 'string' || typeof endDate !== 'string')
    {
        throw new ValidationError('Podaj datę rozpoczęcia i zakończenia wydarzenia')
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
    {
        throw new ValidationError('Podaj poprawne daty wydarzenia')
    }

    if (end <= start)
    {
        throw new ValidationError('Wydarzenie musi kończyć się po rozpoczęciu')
    }

    const event: newEvent = {
        name: name.trim(),
        price: price.trim().replace(',', '.'),
        description: description?.trim(),
        startDate: start,
        endDate: end,
        hallId
    }

    await eventRepository.createEvent(event)
}
