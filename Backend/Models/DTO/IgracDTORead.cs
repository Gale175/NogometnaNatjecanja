
namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o igraču.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator igrača.</param>
    /// <param name="Ime">Ime igrača.</param>
    /// <param name="Prezime">Prezime igrača.</param>
    /// <param name="Dob">Dob igrača.</param>
    /// <param name="Pozicija">Pozicija na kojoj igrač igra.</param>
    /// <param name="Golovi">Postigunuti golovi igrača u karijeri.</param>
    /// /// <param name="Asistencije">Postigunute asistencije igrača u karijeri.</param>
    /// /// <param name="Slika">URL slike igrača (opcionalno).</param>
    public record IgracDTORead(
        int? Sifra, 
        string Ime, 
        string Prezime,
        int Dob, 
        string? Pozicija,
        int Golovi,
        int Asistencije,
        string? Slika);


}
