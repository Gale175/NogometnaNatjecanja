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
    }
}
