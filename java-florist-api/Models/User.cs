using System;
using System.Collections.Generic;

#nullable disable

namespace java_florist_api.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int Active { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Address { get; set; }
        public DateTime? Birthday { get; set; }
        public string Name { get; set; }
        public string Phonenumber { get; set; }
        public string ImgName { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
