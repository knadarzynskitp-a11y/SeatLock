import {createSeatsService, createHallService} from '../../src/application/use-cases/hallServices.js'
import {test, expect, vi} from 'vitest'

test('numeruje miejsca prawidłowo między rzędami', async() => {
    const repository = {createSeats: vi.fn(async () => {})}
})
