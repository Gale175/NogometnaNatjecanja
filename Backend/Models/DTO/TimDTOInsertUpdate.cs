
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
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