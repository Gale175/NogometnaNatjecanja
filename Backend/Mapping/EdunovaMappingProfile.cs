using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using Beckend.Models.DTO;

namespace Beckend.Mapping
{
    public class EdunovaMappingProfile:Profile
    {
        public EdunovaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Natjecanje, NatjecanjeDTORead>();
            CreateMap<NatjecanjeDTOInsertUpdate, Natjecanje>();
            CreateMap<Natjecanje, NatjecanjeDTOInsertUpdate>();

        }
    }
}
