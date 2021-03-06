﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace java_florist_api.Models
{
    public partial class Feedbackdatum
    { 
        public int Id { get; set; }
        public int Userid { get; set; }
        public int Productid { get; set; }
        public string Feedback { get; set; }
        public string FbReply { get; set; }
        public int Vote { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
