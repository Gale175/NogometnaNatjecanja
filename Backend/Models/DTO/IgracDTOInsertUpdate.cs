
using System.ComponentModel.DataAnnotations;

namespace Beckend.Models.DTO
{
    public record IgracDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string? Prezime,
        [Required(ErrorMessage = "Email obavezno")]
        [EmailAddress(ErrorMessage ="Email nije dobrog formata")]
        string? Email,
        string? Oib);
}
