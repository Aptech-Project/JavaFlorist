using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Cartdetail
    {
        public int Id { get; set; }
        public int Quanity { get; set; }
        public int Cartid { get; set; }
        public int Productid { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Product Product { get; set; }
    }
}
