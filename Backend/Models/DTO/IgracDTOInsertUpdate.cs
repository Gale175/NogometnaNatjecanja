using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje igrača.
    /// </summary>
    /// <param name="Ime">Ime igrača. Obavezno polje.</param>
    /// <param name="Prezime">Prezime igrača. Obavezno polje.</param>
    /// <param name="Dob">Dob igrača.</param>
    /// <param name="Pozicija">Pozicija na kojoj igrač igra.</param>
    /// <param name="Golovi">Broj postignutih golova u karijeri igrača.</param>
    /// <param name="Asistencije">Broj asistencija u karijeri igrača.</param>
    public record IgracDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        int? Dob,
        string? Pozicija,
        int? Golovi,
        int? Asistencije
        );
}
