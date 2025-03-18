using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    /// <summary>
    /// Kontekst baze podataka za aplikaciju Edunova.
    /// </summary>
    /// <remarks>
    /// Konstruktor koji prima opcije za konfiguraciju konteksta.
    /// </remarks>
    /// <param name="opcije">Opcije za konfiguraciju konteksta.</param>
    public class NatjecanjaContext(DbContextOptions<NatjecanjaContext> opcije) : DbContext(opcije)
    {
        /// <summary>
        /// Skup podataka za entitet Natjecanje.
        /// </summary>
        public DbSet<Natjecanje> Natjecanja { get; set; } // zbog ovog ovdje Natjecanje tablica se zove u mnozini

        /// <summary>
        /// Skup podataka za entitet Igrac.
        /// </summary>
        public DbSet<Igrac> Igraci { get; set; }

        /// <summary>
        /// Skup podataka za entitet Tim.
        /// </summary>
        public DbSet<Tim> Timovi { get; set; }

        /// <summary>
        /// Skup podataka za entitet Operater.
        /// </summary>
        public DbSet<Operater> Operateri { get; set; }


        /// <summary>
        /// Konfiguracija modela prilikom kreiranja baze podataka.
        /// </summary>
        /// <param name="modelBuilder">Graditelj modela.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // implementacija veze 1:n
            modelBuilder.Entity<Tim>().HasOne(g => g.Natjecanje);

            // implementacija veze n:n
            modelBuilder.Entity<Tim>()
                .HasMany(g => g.Igraci)
                .WithMany(p => p.Timovi)
                .UsingEntity<Dictionary<string, object>>("timovi_igraci",
                c => c.HasOne<Igrac>().WithMany().HasForeignKey("igrac"),
                c => c.HasOne<Tim>().WithMany().HasForeignKey("tim"),
                c => c.ToTable("timovi_igraci")
                );

        }
    }
}
