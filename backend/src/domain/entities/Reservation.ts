export type ReservationStatus = | "PENDING" | "CONFIRMED" | "EXPIRED" | "CANCELLED";

export interface Reservation {
    id: number;
    user_id: number;
    event_id: number;
    seat_id: number;
    status: ReservationStatus;
    expires_at: Date;
    created_at: Date;
}