using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using java_florist_api.Models;

namespace java_florist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartdetailsController : ControllerBase
    {
        private readonly javafloristContext _context;

        public CartdetailsController(javafloristContext context)
        {
            _context = context;
        }

        // GET: api/Cartdetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cartdetail>>> GetCartdetails()
        {
            return await _context.Cartdetails.ToListAsync();
        }

        // GET: api/Cartdetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cartdetail>> GetCartdetail(int id)
        {
            var cartdetail = await _context.Cartdetails.FindAsync(id);

            if (cartdetail == null)
            {
                return NotFound();
            }

            return cartdetail;
        }

        // PUT: api/Cartdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Cartdetail>> PutCartdetail(int id, Cartdetail cartdetail)
        {
            cartdetail = await _context.Cartdetails.FindAsync(cartdetail.Id);
            if (id ==-1)
            {
                if (cartdetail.Quanity > 1)
                {
                    cartdetail.Quanity= cartdetail.Quanity-1;
                    _context.Entry(cartdetail).State = EntityState.Modified;
                }
            }
            else if (id==1)
            {
                cartdetail.Quanity = cartdetail.Quanity+1;
                _context.Entry(cartdetail).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartdetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return cartdetail;
        }

        // POST: api/Cartdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cartdetail>> PostCartdetail(Cartdetail cartdetail)
        {
            _context.Cartdetails.Add(cartdetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartdetail", new { id = cartdetail.Id }, cartdetail);
        }

        // DELETE: api/Cartdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartdetail(int id)
        {
            var cartdetail = await _context.Cartdetails.FindAsync(id);
            if (cartdetail == null)
            {
                return NotFound();
            }

            _context.Cartdetails.Remove(cartdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartdetailExists(int id)
        {
            return _context.Cartdetails.Any(e => e.Id == id);
        }
    }
}
