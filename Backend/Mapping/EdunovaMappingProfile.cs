using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mapping
{
    public class EdunovaMappingProfile : Profile
    {
        public EdunovaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Natjecanje, NatjecanjeDTORead>();
            CreateMap<NatjecanjeDTOInsertUpdate, Natjecanje>();
            CreateMap<Natjecanje, NatjecanjeDTOInsertUpdate>();

            CreateMap<Igrac, IgracDTORead>();
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
    }
}
