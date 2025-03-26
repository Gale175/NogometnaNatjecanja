namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o natjecanju.
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra natjecanja.</param>
    /// <param name="Naziv">Naziv natjecanja.</param>
    /// <param name="Vrsta">Vrsta natjecanja- kup ili liga</param>
    /// <param name="Drzava">Država u kojoj se odigrava natjecanje</param>
    /// <param name="Sezona">Sezona u kojoj se odigrava natjecanje.</param>
    /// <param name="Pobjednik">Pobjednik natjecanja.</param>
    /// <param name="NajboljiIgrac">MVP natjecanja.</param>
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
