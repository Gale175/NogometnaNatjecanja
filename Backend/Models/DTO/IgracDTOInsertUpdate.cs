using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record IgracDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        string? Dob,
        string? Golovi,
        string? Asistencije);
}
