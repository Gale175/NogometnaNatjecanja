using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje natjecanjima u aplikaciji.
    /// </summary>
    /// <param name="context">Instanca NatjecanjaContext klase koja se koristi za pristup bazi podataka.</param>
    /// <param name="mapper">Instanca IMapper sučelja koja se koristi za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NatjecanjeController(NatjecanjaContext context, IMapper mapper) : NogometnaNatjecanjaController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sva natjecanja.
        /// </summary>
        /// <returns>Lista DTO objekata natjecanja.</returns>
        [HttpGet]
        public ActionResult<List<NatjecanjeDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NatjecanjeDTORead>>(_context.Natjecanja));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        /// <summary>
        /// Dohvaća natjecanje prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra natjecanja.</param>
        /// <returns>DTO objekt natjecanja.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<NatjecanjeDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Natjecanje? e;
            try
            {
                e = _context.Natjecanja.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Natjecanje ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NatjecanjeDTOInsertUpdate>(e));
        }


        /// <summary>
        /// Dodaje novo natjecanje.
        /// </summary>
        /// <param name="dto">DTO objekt za unos ili ažuriranje natjecanja.</param>
        /// <returns>Status kreiranja i DTO objekt novog natjecanja.</returns>
        [HttpPost]
        public IActionResult Post(NatjecanjeDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Natjecanje>(dto);
                _context.Natjecanja.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NatjecanjeDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }


        /// <summary>
        /// Ažurira postojeće natjecanje prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra natjecanja.</param>
        /// <param name="dto">DTO objekt za unos ili ažuriranje natjecanja.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, NatjecanjeDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Natjecanje? e;
                try
                {
                    e = _context.Natjecanja.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Natjecanje ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Natjecanja.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        /// <summary>
        /// Briše natjecanje prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra natjecanja.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Natjecanje? e;
                try
                {
                    e = _context.Natjecanja.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Natjecanje ne postoji u bazi");
                }
                _context.Natjecanja.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

    }
}
