using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Cart
    {
        public Cart()
        {
            Cartdetails = new HashSet<Cartdetail>();
        }

        public int Id { get; set; }
        public int? Userid { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Cartdetail> Cartdetails { get; set; }
    }
}
