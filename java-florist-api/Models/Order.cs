using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public int Id { get; set; }
        public string Address { get; set; }
        public DateTime Date { get; set; }
        public DateTime? Deliverydate { get; set; }
        public string Email { get; set; }
        public string Note { get; set; }
        public string Paymentmethod { get; set; }
        public string Phonenumber { get; set; }
        public string Receiver { get; set; }
        public string Status { get; set; }
        public double Totalmoney { get; set; }
        public int Userid { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
