using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PizzaAndSushi.Models
{
  public  class Order
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string Address { get; set; }

        [Required]
        [MaxLength(500)]
        public string Details { get; set; }

        [Required]
        [MaxLength(500)]
        public string PhoneNumber { get; set; }

        [Required]
        public bool IsProcessed { get; set; }

        [Required]
        public bool IsSelfTake { get; set; }

        [Required]
        public DateTime CreatedOne { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
}
