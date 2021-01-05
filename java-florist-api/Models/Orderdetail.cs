using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Orderdetail
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int Orderid { get; set; }
        public int Productid { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
