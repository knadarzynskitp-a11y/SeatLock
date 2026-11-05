export interface ConcertHall {
    id:number,
    name: string,
    country: string,
    city: string,
    street: string,
    number?: string
    institution?: string,
    created_at: Date
}

export interface Event {
    id: number,
    name: string,
    describe: string,
    price: string,
    hall_id: number,
    date: Date,
    time_begin: string,
    time_end: string,
    created_at: Date
}

export interface Ticket
{
    id: number,
    event_id: number,
    user_id: number,
    sector: number,
    row: number,
    seat_number: number,
    created_at: Date
}