namespace Backend.Models
{
    public class Igrac : Entitet
    {
        public int Sifra { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public int? Dob { get; set; }
        public int Golovi { get; set; }
        public int Asistencije { get; set; }
    }
}
