using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Tim : Entitet
    {
        public string? Naziv { get; set; }

        [ForeignKey("natjecanje")]
        public required Natjecanje Natjecanje { get; set; }

        public string? Predavac { get; set; }

        public string? Trener { get; set; }

        public string? Stadion { get; set; }

        public ICollection<Igrac>? Igraci { get; set; }
    }
}