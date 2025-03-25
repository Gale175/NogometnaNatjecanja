using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    // [Authorize]
    public abstract class NogometnaNatjecanjaController:ControllerBase
    {

        // dependecy injection
        // 1. definiraš privatno svojstvo
        protected readonly NatjecanjaContext _context;

        protected readonly IMapper _mapper;


        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public NogometnaNatjecanjaController(NatjecanjaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}
