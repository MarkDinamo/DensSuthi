using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaAndSushi.DB
{
   public class PizzaAndSushiContext :  DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=PizzaAndSushi;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}
