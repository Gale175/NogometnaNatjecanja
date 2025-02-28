
using System.ComponentModel.DataAnnotations;

namespace Beckend.Models.DTO
{
    public record TimDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "smjer obavezno")]
        int? SmjerSifra,
        string? Predavac
        );


}