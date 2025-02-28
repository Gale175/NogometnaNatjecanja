using AutoMapper;
using Backend.Data;
using Beckend.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{

    public abstract class NogometnaNatjecanjaontroller:ControllerBase
    {

        // dependecy injection
        // 1. definiraš privatno svojstvo
        protected readonly NatjecanjaContext _context;

        protected readonly IMapper _mapper;


        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public NogometnaNatjecanjaontroller(NatjecanjaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}
