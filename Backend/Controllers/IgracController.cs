using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje igračima.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class IgracController(NatjecanjaContext context, IMapper mapper) : NogometnaNatjecanjaController(context, mapper)
    {

        /// <summary>
        /// Dohvaća sve igrače.
        /// </summary>
        /// <returns>Lista igrača.</returns>
        [HttpGet]
        public ActionResult<List<IgracDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<IgracDTORead>>(_context.Igraci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        /// <summary>
        /// Dohvaća igrača prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra igrača.</param>
        /// <returns>Igrač.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<IgracDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Igrac? e;
            try
            {
                e = _context.Igraci.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Igrač ne postoji u bazi" });
            }

            return Ok(_mapper.Map<IgracDTOInsertUpdate>(e));
        }


        /// <summary>
        /// Dodaje novog igrača.
        /// </summary>
        /// <param name="dto">Podaci o igraču.</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(IgracDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Igrac>(dto);
                _context.Igraci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<IgracDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }


        /// <summary>
        /// Ažurira igrača prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra igrača.</param>
        /// <param name="dto">Podaci o igraču.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, IgracDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Igrac? e;
                try
                {
                    e = _context.Igraci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Igrač ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Igraci.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        /// <summary>
        /// Briše igrača prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra igrača.</param>
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
                Igrac? e;
                try
                {
                    e = _context.Igraci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Igrač ne postoji u bazi");
                }
                _context.Igraci.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Traži igrače prema uvjetu.
        /// </summary>
        /// <param name="uvjet">Uvjet pretrage.</param>
        /// <returns>Lista igrača.</returns>
        [HttpGet]
        [Route("trazi/{uvjet}")]
        public ActionResult<List<IgracDTORead>> TraziIgrac(string uvjet)
        {
            if (uvjet == null || uvjet.Length < 3)
            {
                return BadRequest(ModelState);
            }
            uvjet = uvjet.ToLower();
            try
            {
                IEnumerable<Igrac> query = _context.Igraci;
                var niz = uvjet.Split(" ");
                foreach (var s in uvjet.Split(" "))
                {
                    query = query.Where(p => p.Ime.ToLower().Contains(s) || p.Prezime.ToLower().Contains(s));
                }
                var igraci = query.ToList();
                return Ok(_mapper.Map<List<IgracDTORead>>(igraci));
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });
            }
        }

        /// <summary>
        /// Traži igrače s paginacijom.
        /// </summary>
        /// <param name="stranica">Broj stranice.</param>
        /// <param name="uvjet">Uvjet pretrage.</param>
        /// <returns>Lista igrača.</returns>
        [HttpGet]
        [Route("traziStranicenje/{stranica}")]
        public IActionResult TraziIgracStranicenje(int stranica, string uvjet = "")
        {
            var poStranici = 4;
            uvjet = uvjet.ToLower();
            try
            {
                IEnumerable<Igrac> query = _context.Igraci;

                var niz = uvjet.Split(" ");
                foreach (var s in uvjet.Split(" "))
                {
                    query = query.Where(p => p.Ime.ToLower().Contains(s) || p.Prezime.ToLower().Contains(s));
                }
                query
                    .OrderBy(p => p.Prezime);
                var igraci = query.ToList();
                var filtriranaLista = igraci.Skip((poStranici * stranica) - poStranici).Take(poStranici);
                return Ok(_mapper.Map<List<IgracDTORead>>(filtriranaLista.ToList())); // za potrebe testiranja
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Postavlja sliku za igrača.
        /// </summary>
        /// <param name="sifra">Šifra igrača.</param>
        /// <param name="slika">Podaci o slici.</param>
        /// <returns>Status postavljanja slike.</returns>
        [HttpPut]
        [Route("postaviSliku/{sifra:int}")]
        public IActionResult PostaviSliku(int sifra, SlikaDTO slika)
        {
            if (sifra <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (slika.Base64 == null || slika.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Igraci.Find(sifra);
            if (p == null)
            {
                return BadRequest("Ne postoji igrač s šifrom " + sifra + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "igraci");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + sifra + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(slika.Base64!));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
