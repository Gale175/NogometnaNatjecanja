using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Natjecanje : Entitet
    {
        public string Naziv { get; set; } = "";
        public string Vrsta { get; set; } = "";
        public string Drzava { get; set; } = "";
        public string Sezona { get; set; } = "";
        public string Pobjednik { get; set; } = "";
        [Column("najbolji_igrac")] // mogućnost mapiranja
        public string? NajboljiIgrac { get; set; }


    }
}
