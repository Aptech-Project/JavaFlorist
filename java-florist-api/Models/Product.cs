using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Product
    {
        public Product()
        {
            Cartdetails = new HashSet<Cartdetail>();
            Orderdetails = new HashSet<Orderdetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }
        public string ImgName { get; set; }
        [NotMapped]
        public string ImgSrc { get; set; }
        [NotMapped]
        public IFormFile ImgFile { get; set; }

        public virtual ICollection<Cartdetail> Cartdetails { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
