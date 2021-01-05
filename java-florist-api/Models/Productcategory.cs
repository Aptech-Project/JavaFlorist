using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Productcategory
    {
        public int Productid { get; set; }
        public string Categoryname { get; set; }

        public virtual Category CategorynameNavigation { get; set; }
        public virtual Product Product { get; set; }
    }
}
