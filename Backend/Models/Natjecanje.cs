namespace Backend.Models
{
    public class Natjecanje : Entitet
    {
        public int Sifra { get; set; }
        public string Naziv { get; set; }
        public string Vrsta { get; set; }
        public string Drzava { get; set; }
        public string Sezona { get; set; }
        public string Pobjednik { get; set; }
        public string? NajboljiIgrac { get; set; }


    }
}
