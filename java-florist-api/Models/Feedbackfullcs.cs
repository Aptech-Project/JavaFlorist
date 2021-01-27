using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace java_florist_api.Models
{
    public class Feedbackfullcs
    {
        public int id { get; set; }
        public int pId { get; set; }
        public int uId { get; set; }
        public string name { get; set; }
        public string pname { get; set; }
        public string fb { get; set; }
        public int vote { get; set; }
        public string fbRep { get; set; }
        public string img { get; set; }
    }
}
