using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using java_florist_api.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace java_florist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly javafloristContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductsController(javafloristContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Select(x => new Product()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    Description = x.Description,
                    ImgName = x.ImgName,
                    ImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImgName)
                })
                .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            product.ImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, product.ImgName);
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm]Product product)
        {
            if (product.ImgFile != null)
            {
                DeleteImage(product.ImgName);
                product.ImgName = await SaveImage(product.ImgFile);
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm]Product product)
        {
            product.ImgName = await SaveImage(product.ImgFile);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            if (product.ImgName != null) DeleteImage(product.ImgName);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imgFile)
        {
            string imgName = new String(Path.GetFileNameWithoutExtension(imgFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imgName = imgName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imgFile.FileName);
            var imgPath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imgName);
            using (var fileStream = new FileStream(imgPath, FileMode.Create))
            {
                await imgFile.CopyToAsync(fileStream);
            }
            return imgName;
        }
        
        [NonAction]
        public void DeleteImage(string imgName)
        {
            var imgPath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imgName);
            if (System.IO.File.Exists(imgPath))
                System.IO.File.Delete(imgPath);
        }
    }
}
