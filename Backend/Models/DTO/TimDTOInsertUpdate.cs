
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje tima.
    /// </summary>
    /// <param name="Naziv">Naziv tima (obavezno).</param>
    /// <param name="NatjecanjeSifra">Šifra natjecanja (obavezno, mora biti između 1 i int.MaxValue).</param>
    /// <param name="Trener">Ime i prezime trenera.</param>
    /// <param name="Stadion">Stadion na kojemu tim odigrava domaće utakmice.</param>
    public record TimDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv tima obavezan")]
        string Naziv,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Najtecanje obavezno")]
        int? NatjecanjeSifra,
        string? Trener,
        string? Stadion
        );


}