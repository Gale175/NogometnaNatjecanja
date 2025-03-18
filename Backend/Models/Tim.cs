using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    /// <summary>
    /// Klasa koja predstavlja tim.
    /// </summary>
    public class Tim : Entitet
    {
        /// <summary>
        /// Naziv tima.
        /// </summary>
        public string? Naziv { get; set; }

        /// <summary>
        /// Natjecanje u kojemu tim sudjeluje.
        /// </summary>

        [ForeignKey("natjecanje")]
        public required Natjecanje Natjecanje { get; set; }

        /// <summary>
        /// Trener tima.
        /// </summary>
        public string? Trener { get; set; }

        /// <summary>
        /// Stadion gdje igra domaće utakmice.
        /// </summary>
        public string? Stadion { get; set; }

        /// <summary>
        /// Igrači koji su u timu.
        /// </summary>
        public ICollection<Igrac>? Igraci { get; set; }
    }
}