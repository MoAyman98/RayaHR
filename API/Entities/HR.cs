using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class HR
    {
        public int HRID { get; set; }
        public string Name { get; set; }
        public int Salary { get; set; }
        public DateTime HiringDate { get; set; }
        public string Status { get; set; }
    }
}