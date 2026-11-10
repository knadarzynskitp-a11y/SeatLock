import type {Hall, newHall } from '../../domain/entities/entities.js'
import { ValidationError } from '../errors/errors.js'
import { IhallRepository } from '../ports/hallPorts.js'


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