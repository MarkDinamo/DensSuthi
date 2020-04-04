using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaAndSushi.Models
{
    public class ScrollResult<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int Count { get; set; }
    }
}
