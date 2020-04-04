using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PizzaAndSushi.Models
{
   public class Feedback
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string Message { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }
    }
}
