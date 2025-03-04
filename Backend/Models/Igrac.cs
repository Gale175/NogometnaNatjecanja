namespace Backend.Models
{
    public class Igrac:Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";
        public int Dob { get; set; } 
        public int Golovi { get; set; } 

        public int Asistencije { get; set; }

        public ICollection<Tim>? Timovi { get; } = [];

    }
}
