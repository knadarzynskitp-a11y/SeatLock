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