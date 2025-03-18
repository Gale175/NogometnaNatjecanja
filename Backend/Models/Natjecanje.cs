using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    /// <summary>
    /// Predstavlja natjecanje u sustavu.
    /// </summary>
    public class Natjecanje : Entitet
    {
        /// <summary>
        /// Naziv natjecanja.
        /// </summary>
        public string Naziv { get; set; } = "";

        /// <summary>
        /// Vrsta natjecanja.
        /// </summary>
        public string Vrsta { get; set; } = "";

        /// <summary>
        /// Država u kojoj se natjecanje održava.
        /// </summary>
        public string Drzava { get; set; } = "";

        /// <summary>
        /// Sezona u kojoj je odigrano natjecanje.
        /// </summary>
        public string Sezona { get; set; } = "";

        /// <summary>
        /// Pobjednik natjecanja.
        /// </summary>
        public string Pobjednik { get; set; } = "";

        /// <summary>
        /// Najbolji igrač natjecanja.
        /// </summary>
        [Column("najbolji_igrac")] // mogućnost mapiranja
        public string? NajboljiIgrac { get; set; }


    }
}
