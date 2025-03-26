
namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka tima.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator tima.</param>
    /// <param name="Naziv">Naziv tima (obavezno).</param>
    /// <param name="NatjecanjeNaziv">Naziv natjecanja u kojem se tim natječe.</param>
    /// <param name="Trener">Ime i prezime trenera.</param>
    /// <param name="Stadion">Stadion na kojemu tim odigrava domaće utakmice.</param>
    public record TimDTORead(
        int Sifra,
        string? Naziv,
        string? NatjecanjeNaziv,
        string? Trener,
        string? Stadion
        );


}