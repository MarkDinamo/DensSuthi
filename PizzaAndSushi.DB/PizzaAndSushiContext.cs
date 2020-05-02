using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaAndSushi.DB
{
   public class PizzaAndSushiContext :  DbContext
    {
        public PizzaAndSushiContext(DbContextOptions<PizzaAndSushiContext> options)
        : base(options)
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Restaurants> Restaurants { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
    }
}
