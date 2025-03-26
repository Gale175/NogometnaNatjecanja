using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    /// <summary>
    /// Apstraktna klasa NogometnaNatjecanjaController koja služi kao osnovna klasa za sve kontrolere u aplikaciji.
    /// </summary>
    /// <param name="context">Instanca NatjecanjaContext klase koja se koristi za pristup bazi podataka.</param>
    /// <param name="mapper">Instanca IMapper sučelja koja se koristi za mapiranje objekata.</param>
    [Authorize]
    public abstract class NogometnaNatjecanjaController(NatjecanjaContext context, IMapper mapper) : ControllerBase
    {
        /// <summary>
        /// Kontekst baze podataka.
        /// </summary>
        protected readonly NatjecanjaContext _context = context;

        /// <summary>
        /// Mapper za mapiranje objekata.
        /// </summary>
        protected readonly IMapper _mapper = mapper;
    }
}
