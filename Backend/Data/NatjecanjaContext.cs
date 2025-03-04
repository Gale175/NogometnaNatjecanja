using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class NatjecanjaContext : DbContext
    {
        public NatjecanjaContext(DbContextOptions<NatjecanjaContext> opcije) : base(opcije)
        {
            //ovdje se  mogu fino postaviti opcije, ali ne za sada
        }
        public DbSet<Natjecanje> Natjecanja { get; set; } // zbog ovog ovdje Natjecanje tablica se zove u mnozini

        public DbSet<Igrac> Igraci { get; set; }

        public DbSet<Tim> Timovi { get; set; }

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
