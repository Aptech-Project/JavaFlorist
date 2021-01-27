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
    public class FeedbackdatumsController : ControllerBase
    {
        private readonly javafloristContext _context;

        public FeedbackdatumsController(javafloristContext context)
        {
            _context = context;
        }

        // GET: api/Feedbackdatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedbackfullcs>>> GetFeedback()
        {
            var feedback = from p in _context.Products
                           join f in _context.Feedbackdata on p.Id equals f.Productid
                           join u in _context.Users on f.Userid equals u.Id
                           select new Feedbackfullcs()
                           
                           {
                               id=f.Id,
                               uId=f.Userid,
                               pId=f.Productid,
                               name = u.Username,
                               pname = p.Name,
                               fb = f.Feedback,
                               vote = f.Vote,
                               fbRep=f.FbReply,
                               img = u.ImgSrc
                           };
                        
            return await feedback.ToListAsync();
        }

        // GET: api/Feedbackdatums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Feedbackfullcs>>> GetFeedbackdatum(int id)
        {
            var feedback = from p in _context.Products
                           join f in _context.Feedbackdata on p.Id equals f.Productid
                           join u in _context.Users on f.Userid equals u.Id
                           where f.Id == id
                           select new Feedbackfullcs()
                           {
                               id = f.Id,
                               uId = f.Userid,
                               pId = f.Productid,
                               name = u.Username,
                               pname = p.Name,
                               fb = f.Feedback,
                               vote = f.Vote,
                               fbRep = f.FbReply,
                               img=u.ImgSrc
                           };
            if (feedback == null)
            {
                return NotFound();
            }

            return await feedback.ToListAsync();
        }
        [HttpGet("Comment/{productId}")]
        public async Task<ActionResult<IEnumerable<Feedbackfullcs>>> GetComment(int productId)
        {
            var feedback = from p in _context.Products
                           join f in _context.Feedbackdata on p.Id equals f.Productid
                           join u in _context.Users on f.Userid equals u.Id
                           where f.Productid==productId
                           select new Feedbackfullcs()
                           {
                               id = f.Id,
                               uId = f.Userid,
                               pId = f.Productid,
                               name = u.Username,
                               pname = p.Name,
                               fb = f.Feedback,
                               vote = f.Vote,
                               fbRep = f.FbReply,
                               img = u.ImgSrc
                           };
            if (feedback == null)
            {
                return NotFound();
            }

            return await feedback.ToListAsync();
        }
        [HttpPut("RepComment/{id}/{rep}")]
        public ActionResult RepComment(int id,string rep)
        {
            var result = _context.Feedbackdata.SingleOrDefault(s => s.Id.Equals(id));
            if (result != null)
            {
                result.FbReply = rep;
                _context.SaveChanges();
            }
            return Ok(result);
        }
        // PUT: api/Feedbackdatums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedbackdatum(int id, Feedbackdatum feedbackdatum)
        {
            if (id != feedbackdatum.Id)
            {
                return BadRequest();
            }

            _context.Entry(feedbackdatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackdatumExists(id))
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

        // POST: api/Feedbackdatums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Feedbackdatum>> PostFeedbackdatum(Feedbackdatum feedbackdatum)
        {
            _context.Feedbackdata.Add(feedbackdatum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedbackdatum", new { id = feedbackdatum.Id }, feedbackdatum);
        }

        // DELETE: api/Feedbackdatums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedbackdatum(int id)
        {
            var feedbackdatum = await _context.Feedbackdata.FindAsync(id);
            if (feedbackdatum == null)
            {
                return NotFound();
            }

            _context.Feedbackdata.Remove(feedbackdatum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeedbackdatumExists(int id)
        {
            return _context.Feedbackdata.Any(e => e.Id == id);
        }
       

    }
}
