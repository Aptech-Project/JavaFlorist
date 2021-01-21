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
    public class CartsController : ControllerBase
    {
        private readonly javafloristContext _context;

        public CartsController(javafloristContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FirstAsync(c => c.Userid == id);
            var id_cart = cart.Id;
            var Cartdetails = await _context.Cartdetails
                .Select(x => new Cartdetail()
                {
                    Id = x.Id,
                    Quanity = x.Quanity,
                    Cartid = id_cart,
                    Productid = x.Productid,
                })
                .ToListAsync();
            foreach (var item in Cartdetails)
            {
                var product = await _context.Products.FirstAsync(p => p.Id == item.Productid);
                item.Product = product;
                item.Product.ImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, product.ImgName);

            }
            cart.Cartdetails = Cartdetails;
            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Product product)
        {
            var cart = await _context.Carts.FirstAsync(c => c.Userid == id);
            var id_cart = cart.Id;
            var Cartdetails = await _context.Cartdetails.FirstOrDefaultAsync(p => p.Cartid == id_cart && p.Productid==product.Id);
            if (Cartdetails!=null)
            {
                Cartdetails.Quanity = Cartdetails.Quanity + 1;
            }
            else
            {
                Cartdetail cartdetail11 = new Cartdetail()
                {
                    Quanity = 1,
                    Cartid = id_cart,
                    Productid = product.Id,
                };
                await _context.Cartdetails.AddAsync(cartdetail11);
            }
           // _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
