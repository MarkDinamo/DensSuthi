using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaAndSushi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }

        [Required]
        [MaxLength(5000)]
        public string Details { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Price { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Weight { get; set; }

        [Required]
        public bool IsLiquid { get; set; }

        [Required]
        public bool IsHidden { get; set; }

        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
    }
}