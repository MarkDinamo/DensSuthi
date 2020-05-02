﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PizzaAndSushi.Models
{
    public class Restaurants
    {
        public int Id { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
