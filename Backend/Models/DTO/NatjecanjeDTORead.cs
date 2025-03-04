namespace Backend.Models.DTO
{
    public record NatjecanjeDTORead(
        int Sifra, 
        string Naziv, 
        string? Vrsta,
        string? Drzava,
        string Sezona,
        string Pobjednik,
        string? NajboljiIgrac
        );

   
}
