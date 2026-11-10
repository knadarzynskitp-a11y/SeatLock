import type {newHall, newSeat, SeatRow } from '../../domain/entities/entities.js'
import { ValidationError } from '../errors/errors.js'
import type { IhallRepository, IseatRepository } from '../ports/hallPorts.js'

export async function createSeatsService(
    hallId: number,
    sector: string,
    rows: SeatRow[],
    seatRepository: IseatRepository
)
{
    if (!Number.isInteger(hallId) || hallId < 1 || hallId > 2147483647)
    {
        throw new ValidationError("Podaj prawidłowe ID sali");
    }

    if (typeof sector !== "string" || !sector.trim() || sector.trim().length > 100)
    {
        throw new ValidationError("Nazwa sektora musi mieć od 1 do 100 znaków");
    }

    sector = sector.trim();

    if (!Array.isArray(rows) || rows.length === 0)
    {
        throw new ValidationError("Podaj rzędy i liczbę miejsc w każdym rzędzie");
    }

    const rowNumbers = new Set<number>();
    let totalSeats = 0;

    for (const row of rows)
    {
        if (!Number.isInteger(row?.number) || row.number < 1 || row.number > 2147483647)
        {
            throw new ValidationError("Numer rzędu musi być dodatnią liczbą całkowitą");
        }

        if (!Number.isInteger(row.seatCount) || row.seatCount < 1)
        {
            throw new ValidationError("Liczba miejsc w rzędzie musi być dodatnią liczbą całkowitą");
        }

        if (rowNumbers.has(row.number))
        {
            throw new ValidationError("Numery rzędów w sektorze nie mogą się powtarzać");
        }

        rowNumbers.add(row.number);
        totalSeats += row.seatCount;

        if (totalSeats > 10000)
        {
            throw new ValidationError("Jednorazowo można dodać maksymalnie 10000 miejsc");
        }
    }

    const seats: newSeat[] = [];
    let seatNumber = 0;

    for (const row of [...rows].sort((first, second) => first.number - second.number))
    {
        for (let i = 0; i < row.seatCount; i++)
        {
            seatNumber++;
            seats.push({hallId, sector, row: row.number, seatNumber});
        }
    }

    await seatRepository.createSeats(hallId, sector, seats);

    return {createdSeats: seats.length};
}


export async function createHallService(
    name: string,
    country: string, 
    zipCode: string,
    city: string,
    street: string,
    number: string,
    institution: string,
    hallRepository: IhallRepository
)
{
    if(!name || !country || !zipCode || !city || !street)
    {
        throw new ValidationError('Wprowadź dane')
    }

    if ([country, name, city, street, zipCode].some(value => typeof value !== "string")) 
    {
        throw new ValidationError("Wszystkie pola muszą być stringami");
    }

    name = name.trim()
    country = country.trim()
    zipCode = zipCode.trim()
    city = city.trim()
    street = street.trim()
    
    if(!name || !country || !zipCode || !city || !street)
    {
        throw new ValidationError('Wprowadź dane')
    }
    
    if(name.length > 100)
    {
        throw new ValidationError("Nazwa może wynosić maksymalnie 100 znaków")
    }
    if(country.toLowerCase() !== "polska")
    {
        throw new ValidationError("Miejsca koncertowe mogą być wyłącznie na terenie Polski")
    }
    if (!/^[0-9]{2}-[0-9]{3}$/.test(zipCode))
    {
        throw new ValidationError("Podaj kod pocztowy w formacie 00-000");
    }
    if(city.length > 50 || street.length > 50)
    {
        throw new ValidationError("Nazwy miasta lub ulicy mogą mieć maksymalnie 50 znaków")
    }

    if(number)
        {
            number = number.trim();

            if(!number) throw new ValidationError("Wprowadzony number jest pusty")
        } 
    if(institution) 
        {
           institution = institution.trim();
           
           if(!institution) throw new ValidationError("Wprowadzona instytucja jest pusta")
        }

        const hall: newHall = {
            name,
            country,
            zipCode,
            city,
            street,
            number,
            institution
        };

    try
    {
        await hallRepository.createHall(hall);
    }
    catch(err)
    {
        throw err;
    }
    
}
