export interface Ticket
{
    id: number,
    event_id: number,
    user_id: number,
    sector: number,
    seat_number: number,
    created_at: Date
}