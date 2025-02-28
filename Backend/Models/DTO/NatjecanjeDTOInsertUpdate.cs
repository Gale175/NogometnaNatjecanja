using System.ComponentModel.DataAnnotations;

namespace Beckend.Models.DTO
{
    public record NatjecanjeDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        string Vrsta,
        string Drzava,
        string Sezona,
        string Pobjednik,
        string? NajboljiIgrac
        );
}
