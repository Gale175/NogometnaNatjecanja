
namespace Backend.Models.DTO
{
    public record IgracDTORead(
        int Sifra, 
        string Ime, 
        string Prezime,
        int Dob, 
        string? Pozicija,
        int Golovi,
        int Asistencije);


}
