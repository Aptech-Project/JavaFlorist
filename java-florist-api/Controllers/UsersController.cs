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
    public class UsersController : ControllerBase
    {
        private readonly javafloristContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UsersController(javafloristContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Select(x => new User()
                {
                    Id = x.Id,
                    Active = x.Active,
                    Email = x.Email,
                    Password = x.Password,
                    Username = x.Username,
                    Role = x.Role,
                    Address = x.Address,
                    Birthday = x.Birthday,
                    Name = x.Name,
                    Phonenumber = x.Phonenumber,
                    ImgName = x.ImgName,
                    ImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImgName)
                })
                .ToListAsync();
        }
        [HttpGet("Role/{role}")]
        public IQueryable<User> UserRole(string role)
        {
            role = "user";
            var userRole = from user in _context.Users where user.Role.Contains(role) select user;
            return userRole;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            {
                var User = await _context.Users.FindAsync(id); 
                User.ImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, User.ImgName); 
                if (User == null) 
                {
                    return NotFound();
                }

                return User;
            }
        }
            // PUT: api/Users/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromForm] User User)
        {
            // if (User.ImgFile != null)
            // {
            //     DeleteImage(User.ImgName);
            //     User.ImgName = await SaveImage(User.ImgFile);
            // }

            _context.Entry(User).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromForm] User User)
        {
                User.ImgName = await SaveImage(User.ImgFile);
                _context.Users.Add(User);
                await _context.SaveChangesAsync();

                _context.Carts.Add(new Cart { Userid = User.Id });
                await _context.SaveChangesAsync();

                //return CreatedAtAction("GetUser", new { id = User.Id }, User);
            //     //return Ok();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User == null)
            {
                return NotFound();
            }
            if (User.ImgName != null) DeleteImage(User.ImgName);
            _context.Users.Remove(User);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUserId(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
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
