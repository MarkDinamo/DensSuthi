using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PizzaAndSushi.Models
{
    public class ProductType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }

        [Range(1, int.MaxValue)]
        public int Priority { get; set; }   

        public List<Product> Products { get; set; }
    }
}