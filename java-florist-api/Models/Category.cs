using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Category
    {
        public int Id { get; set; }
        public string Categoryname { get; set; }
        public int Active { get; set; }
        public string Message { get; set; }
    }
}
