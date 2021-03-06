﻿using System;
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
    public class OrdersController : ControllerBase
    {
        private readonly javafloristContext _context;

        public OrdersController(javafloristContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetOrder(int id)
        {
            var user = await _context.Users.FirstAsync(u => u.Id == id);

            var order = await _context.Orders
               .Where(od => od.Userid == id)
               .Select(x => new Order()
               {
                   Id = x.Id,
                   Address=x.Address,
                   Paymentmethod=x.Paymentmethod,
                   Phonenumber=x.Phonenumber,
                   Message=x.Message,
                   Deliverydate=x.Deliverydate,
                   Email=x.Email,
                   Totalmoney=x.Totalmoney,
                   Receiver=x.Receiver,
                   Status=x.Status,
                   Note=x.Note
               }).ToListAsync();
            user.Orders = order;
            return user;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id )
        {
            var order_Deliv = await _context.Orders.FindAsync(id);
            order_Deliv.Deliverydate = DateTime.Now;
            order_Deliv.Status = "Delivered";
            _context.Entry(order_Deliv).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromForm] Order order)
        {

            order.Date = DateTime.Now;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            var cart = await _context.Carts.FirstAsync(c => c.Userid == order.Userid);
            var id_cart = cart.Id;
            var Cartdetails = await _context.Cartdetails
               .Where(cd => cd.Cartid == id_cart)
               .Select(x => new Cartdetail()
               {
                   Id = x.Id,
                   Quanity = x.Quanity,
                   Cartid = x.Cartid,
                   Productid = x.Productid,
               }).ToListAsync();
            var oder_id = await _context.Orders.OrderByDescending(p => p.Id).FirstAsync();
            foreach (var item in Cartdetails)
            {
                Orderdetail orderdetail = new Orderdetail();
                orderdetail.Productid = item.Productid;
                orderdetail.Orderid = oder_id.Id;
                orderdetail.Quantity = item.Quanity;
                _context.Orderdetails.Add(orderdetail);
                await _context.SaveChangesAsync();
            }
            foreach (var item in Cartdetails)
            {
                var cartdetail = await _context.Cartdetails.FirstAsync(c=> c.Id==item.Id);
                if (cartdetail
                    != null)
                {
                    _context.Cartdetails.Remove(cartdetail);
                    await _context.SaveChangesAsync();
                }
            }

            return NoContent();
        }
        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            order.Status = "Canceled";
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
