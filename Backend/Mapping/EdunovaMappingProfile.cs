using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mapping
{    
    /// <summary>
    /// Klasa za definiranje mapiranja između modela i DTO objekata.
    /// </summary>
    public class EdunovaMappingProfile : Profile
    {
        /// <summary>
        /// Konstruktor u kojem se definiraju mapiranja.
        /// </summary>
        public EdunovaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Natjecanje, NatjecanjeDTORead>();
            CreateMap<NatjecanjeDTOInsertUpdate, Natjecanje>();
            CreateMap<Natjecanje, NatjecanjeDTOInsertUpdate>();

            CreateMap<Igrac, IgracDTORead>()
                .ConstructUsing(entitet =>
               new IgracDTORead(
                  entitet.Sifra,
                  entitet.Ime ?? "",
                  entitet.Prezime ?? "",
                  entitet.Dob,
                  entitet.Pozicija ?? "",
                  entitet.Golovi,
                  entitet.Asistencije,
                  PutanjaDatoteke(entitet)));
            CreateMap<IgracDTOInsertUpdate, Igrac>();
            CreateMap<Igrac, IgracDTOInsertUpdate>();


            CreateMap<Tim, TimDTORead>()
                .ForCtorParam(
                   "NatjecanjeNaziv",
                   opt => opt.MapFrom(src => src.Natjecanje.Naziv)
               );
            CreateMap<Tim, TimDTOInsertUpdate>().ForMember(
                    dest => dest.NatjecanjeSifra,
                    opt => opt.MapFrom(src => src.Natjecanje.Sifra)
                );
            CreateMap<TimDTOInsertUpdate, Tim>();

        }

        /// <summary>
        /// Metoda za dobivanje putanje do slike igrača.
        /// </summary>
        /// <param name="e">Objekt igrača.</param>
        /// <returns>Putanja do slike ili null ako slika ne postoji.</returns>
        private static string? PutanjaDatoteke(Igrac e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "igraci" + ds + e.Sifra + ".png");
                return File.Exists(slika) ? "/slike/igraci/" + e.Sifra + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
