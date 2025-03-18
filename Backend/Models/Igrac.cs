namespace Backend.Models
{
    /// <summary>
    /// Klasa koja predstavlja igrača.
    /// </summary>
    public class Igrac:Entitet
    {
        /// <summary>
        /// Ime igrača.
        /// </summary>
        public string Ime { get; set; } = "";

        /// <summary>
        /// Prezime polaznika.
        /// </summary>
        public string Prezime { get; set; } = "";

        /// <summary>
        /// Dob igrača.
        /// </summary>
        public int Dob { get; set; }

        /// <summary>
        /// Broj postignutih golova igrača.
        /// </summary>
        public int Golovi { get; set; }

        /// <summary>
        /// Pozicija na kojoj igrač igra.
        /// </summary>
        public string? Pozicija { get; set; }

        /// <summary>
        /// Broj asistencija igrača.
        /// </summary>
        public int Asistencije { get; set; }

        public ICollection<Tim>? Timovi { get; } = [];

    }
}
