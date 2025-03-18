using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    /// <summary>
    /// Apstraktna klasa koja predstavlja entitet s jedinstvenim identifikatorom.
    /// </summary>
    public abstract class Entitet
    {
        /// <summary>
        /// Jedinstveni identifikator entiteta.
        /// </summary>
        [Key] // dio EF ORM-a
        public int? Sifra { get; set; }
    }
}
