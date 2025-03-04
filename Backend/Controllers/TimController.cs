using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class TimController(NatjecanjaContext context, IMapper mapper) : NogometnaNatjecanjaController(context, mapper)
    {


        // RUTE
        [HttpGet]
        public ActionResult<List<TimDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<TimDTORead>>(_context.Timovi.Include(g => g.Natjecanje)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<TimDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Tim? e;
            try
            {
                e = _context.Timovi.Include(g => g.Natjecanje).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Tim ne postoji u bazi" });
            }

            return Ok(_mapper.Map<TimDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(TimDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Natjecanje? es;
            try
            {
                es = _context.Natjecanja.Find(dto.NatjecanjeSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Tim nije sudjelovao na natjecanju" });
            }

            try
            {
                var e = _mapper.Map<Tim>(dto);
                e.Natjecanje = es;
                _context.Timovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<TimDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, TimDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Tim? e;
                try
                {
                    e = _context.Timovi.Include(g => g.Natjecanje).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Tim ne postoji u bazi" });
                }

                Natjecanje? es;
                try
                {
                    es = _context.Natjecanja.Find(dto.NatjecanjeSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Tim nije sudjelovao na natjecanju" });
                }

                e = _mapper.Map(dto, e);
                e.Natjecanje = es;
                _context.Timovi.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

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
                Tim? e;
                try
                {
                    e = _context.Timovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Tim ne postoji u bazi");
                }
                _context.Timovi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpGet]
        [Route("Igraci/{sifraTimovi:int}")]
        public ActionResult<List<IgracDTORead>> GetTimovi(int sifraTimovi)
        {
            if (!ModelState.IsValid || sifraTimovi <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Timovi
                    .Include(i => i.Igraci).FirstOrDefault(x => x.Sifra == sifraTimovi);
                if (p == null)
                {
                    return BadRequest("Ne postoji tim s šifrom " + sifraTimovi + " u bazi");
                }

                return Ok(_mapper.Map<List<IgracDTORead>>(p.Igraci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpPost]
        [Route("{sifra:int}/dodaj/{igracSifra:int}")]
        public IActionResult DodajPolaznika(int sifra, int igracSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || igracSifra <= 0)
            {
                return BadRequest("Šifra tima ili igrača nije dobra");
            }
            try
            {
                var tim = _context.Timovi
                    .Include(g => g.Igraci)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (tim == null)
                {
                    return BadRequest("Ne postoji tim s šifrom " + sifra + " u bazi");
                }
                var igrac = _context.Igraci.Find(igracSifra);
                if (igrac == null)
                {
                    return BadRequest("Ne postoji igrač s šifrom " + igracSifra + " u bazi");
                }
                tim.Igraci.Add(igrac);
                _context.Timovi.Update(tim);
                _context.SaveChanges();
                return Ok(new
                {
                    poruka = "Igrač " + igrac.Prezime + " " + igrac.Ime + " dodan u tim "
                 + tim.Naziv
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}/obrisi/{igracSifra:int}")]
        public IActionResult ObrisiIgraca(int sifra, int igracSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || igracSifra <= 0)
            {
                return BadRequest("Šifra tima ili igrača nije dobra");
            }
            try
            {
                var tim = _context.Timovi
                    .Include(g => g.Igraci)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (tim == null)
                {
                    return BadRequest("Ne postoji tim s šifrom " + sifra + " u bazi");
                }
                var igrac = _context.Igraci.Find(igracSifra);
                if (igrac == null)
                {
                    return BadRequest("Ne postoji igrač s šifrom " + igracSifra + " u bazi");
                }
                tim.Igraci.Remove(igrac);
                _context.Timovi.Update(tim);
                _context.SaveChanges();

                return Ok(new
                {
                    poruka = "Igrač " + igrac.Prezime + " " + igrac.Ime + " obrisan iz grupe "
                 + tim.Naziv
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });

            }
        }


    }
}