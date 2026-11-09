import type {Hall, newHall } from '../../domain/entities/entities.js'
import { ValidationError } from '../errors/errors.js'


export async function createHallService(
    name: string,
    country: string, 
    zipCode: string,
    city: string,
    street: string,
    number: string,
    institution: string
)
{
    if(!name || !country || !zipCode || !city || !street)
    {
        throw new ValidationError('Wprowadź dane')
    }
    name = name.trim()
    country = country.trim()
    zipCode = zipCode.trim()
    city = city.trim()
    street = street.trim()
    
    if ([country, name, city, street, zipCode].some(value => typeof value !== "string")) 
    {
        throw new Error("Wszystkie pola muszą być stringami");
    }
    if(name.length > 100)
    {
        throw new ValidationError("Nazwa może wynosić maksymalnie 100 znaków")
    }
    if(country.toLowerCase() !== "polska")
    {
        throw new ValidationError("Miejsca koncertowe mogą być wyłącznie na terenie Polski")
    }
    if(zipCode.length > 6)
    {
        throw new ValidationError("Kod pocztowy jest zbyt długi")
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

    

   
    
    
    
}