namespace Backend.Models
{
    public class Igrac:Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";
        public string? Dob { get; set; } 
        public string Golovi { get; set; } = "";

        public string Asistencije { get; set; } = "";

        public ICollection<Tim>? Timovi { get; } = [];

    }
}
