using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Favorite
    {
        public int Userid { get; set; }
        public int Productid { get; set; }

        public virtual Product Product { get; set; }
    }
}
