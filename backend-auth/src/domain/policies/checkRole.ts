const roles = ["Admin", "Client"]

export function checkRole(role: string): boolean 
{
    return roles.includes(role)
}