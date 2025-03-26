using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje natjecanja.
    /// </summary>
    /// <param name="Naziv">Naziv natjecanja (obavezno)</param>
    /// <param name="Vrsta">Vrsta natjecanja- kup ili liga</param>
    /// <param name="Drzava">Država u kojoj se odigrava natjecanje</param>
    /// <param name="Sezona">Sezona u kojoj se odigrava natjecanje. Unos je obavezan</param>
    /// <param name="Pobjednik">Pobjednik natjecanja. Unos je obavezan</param>
    /// /// <param name="NajboljiIgrac">MVP natjecanja</param>
    public record NatjecanjeDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv je obavezan")]
        string Naziv,
        string? Vrsta,
        string? Drzava,
        [Required(ErrorMessage = "Sezona mora biti upisana")]
        string Sezona,
        [Required(ErrorMessage = "Pobjednik je obavezan")]
        string Pobjednik,
        string? NajboljiIgrac
        );
}
