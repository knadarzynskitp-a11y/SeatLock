export interface Event {
    id: number | null;
    name: string;
    price: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    hallId: number;
    createdAt: Date;
}

export type newEvent = Omit<Event, "id" | "createdAt">

export interface Seat {
    id: number | null;
    hallId: number;
    sector: string;
    row: number;
    seatNumber: number;
    createdAt: Date;
}

export type newSeat = Omit<Seat, "id" | "createdAt">

export interface Hall {
    id: number | null;
    name: string;
    country: string;
    zipCode: string;
    city: string;
    street: string;
    number: string | null;
    institution: string | null;
    createdAt: Date;
}

export type newHall = Omit<Hall, "id" | "createdAt">