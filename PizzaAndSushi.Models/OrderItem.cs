using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaAndSushi.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        [Range(0, int.MaxValue)]
        public int Count { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
