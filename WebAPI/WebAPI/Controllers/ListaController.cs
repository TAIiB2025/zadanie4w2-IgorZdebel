using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaController : ControllerBase
    {
        private static List<ElementListy> lista = new()
        {
            new ElementListy
            {
                Id = 1,
                Nazwa = "Malowanie ścian",
                Wykonawca = "Jan Kowalski",
                Rodzaj = "Budowlana",
                Rok = 2023
            },
            new ElementListy
            {
                Id = 2,
                Nazwa = "Naprawa laptopa",
                Wykonawca = "TechFix Serwis",
                Rodzaj = "Elektroniczna",
                Rok = 2024
            },
            new ElementListy
            {
                Id = 3,
                Nazwa = "Projekt ogrodu",
                Wykonawca = "Zielony Zakątek",
                Rodzaj = "Projektowa",
                Rok = 2022
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<ElementListy>> Get([FromQuery] string? fraza)
        {
            var wynik = lista;

            if (!string.IsNullOrWhiteSpace(fraza))
            {
                wynik = lista
                    .Where(e => e.Nazwa != null && e.Nazwa.Contains(fraza, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            return Ok(wynik);
        }

        [HttpGet("{id}")]
        public ActionResult<ElementListy> GetById(int id)
        {
            var element = lista.FirstOrDefault(e => e.Id == id);
            if (element == null)
                return NotFound();

            return Ok(element);
        }

        [HttpPost]
        public IActionResult Post(ElementListy element)
        {
            var blad = WalidujElement(element);
            if (blad != null)
                return BadRequest(blad);

            element.Id = lista.Any() ? lista.Max(e => e.Id) + 1 : 1;
            lista.Add(element);
            return CreatedAtAction(nameof(Get), new { id = element.Id }, element);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ElementListy element)
        {
            var istnieje = lista.FirstOrDefault(e => e.Id == id);
            if (istnieje == null)
                return NotFound();

            var blad = WalidujElement(element);
            if (blad != null)
                return BadRequest(blad);

            istnieje.Nazwa = element.Nazwa;
            istnieje.Wykonawca = element.Wykonawca;
            istnieje.Rodzaj = element.Rodzaj;
            istnieje.Rok = element.Rok;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var element = lista.FirstOrDefault(e => e.Id == id);
            if (element == null)
                return NotFound();

            lista.Remove(element);
            return NoContent();
        }

        private string? WalidujElement(ElementListy element)
        {
            if (string.IsNullOrWhiteSpace(element.Nazwa))
                return "Pole 'Nazwa' jest wymagane.";

            if (element.Nazwa.Length > 100)
                return "Pole 'Nazwa' nie może przekraczać 100 znaków.";

            if (string.IsNullOrWhiteSpace(element.Rodzaj))
                return "Pole 'Rodzaj' jest wymagane.";

            if (!CzyRodzajPoprawny(element.Rodzaj))
                return "Rodzaj musi być jedną z wartości: budowlana, projektowa, edukacyjna.";

            if (element.Rok > 2025)
                return "Rok nie może być większy niż 2025.";

            return null;
        }

        private bool CzyRodzajPoprawny(string rodzaj)
        {
            return new[] { "budowlana", "projektowa", "edukacyjna" }
                .Contains(rodzaj.ToLower());
        }
    }
}
