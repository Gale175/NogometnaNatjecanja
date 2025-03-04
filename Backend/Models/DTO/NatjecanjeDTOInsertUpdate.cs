using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record NatjecanjeDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv je obavezan")]
        string Naziv,
        string? Vrsta,
        string? Drzava,
        [Required(ErrorMessage = "Sezona mora biti upisana")]
        string? Sezona,
        [Required(ErrorMessage = "Pobjednik je obavezan")]
        string? Pobjednik,
        string? NajboljiIgrac
        );
}
