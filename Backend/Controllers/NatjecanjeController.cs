using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NatjecanjeController : ControllerBase 

    {
        // koristimo dependency injection
        // 1. definiramo privatno svojstvo

        private readonly NatjecanjaContext context;

        // 2. u konstruktoru postavljamo vrijednost

        public NatjecanjeController(NatjecanjaContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult Geta()
        {
            try
            {
                return Ok(this.context.Natjecanja);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var natjecanje = this.context.Natjecanja.Find(sifra);
                if (natjecanje == null)
                {
                    return NotFound(new { poruka = $"Natjecanje sa šifrom {sifra} ne postoji" });
                }
                return Ok(natjecanje);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public IActionResult Post(Natjecanje natjecanje)
        {
            try
            {
                this.context.Natjecanja.Add(natjecanje);
                this.context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new { poruka = "Natjecanje uspješno dodano", natjecanje });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Natjecanje natjecanje)
        {
            try
            {

                var natjecanjeBaza = this.context.Natjecanja.Find(sifra);
                if (natjecanjeBaza == null)
                {
                    return NotFound(new { poruka = $"Natjecanje sa šifrom {sifra} ne postoji" });
                }

                // rucni mapping - kasnije automatika
                natjecanjeBaza.Naziv = natjecanje.Naziv;
                natjecanjeBaza.Vrsta = natjecanje.Vrsta;
                natjecanjeBaza.Drzava = natjecanje.Drzava;
                natjecanjeBaza.Sezona = natjecanje.Sezona;
                natjecanjeBaza.Pobjednik = natjecanje.Pobjednik;
                natjecanjeBaza.NajboljiIgrac = natjecanje.NajboljiIgrac;

                this.context.Natjecanja.Update(natjecanjeBaza);
                this.context.SaveChanges();
                return Ok(natjecanjeBaza);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var natjecanje = this.context.Natjecanja.Find(sifra);
                if (natjecanje == null)
                {
                    return NotFound(new { poruka = $"Natjecanje s šifrom {sifra} ne postoji" });
                }
                this.context.Natjecanja.Remove(natjecanje);
                this.context.SaveChanges();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

    }
}
